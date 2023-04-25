<template>
   <NavComponent />
   <div class="body">
      <div class="select-container">
         <div class="select-container__inputs">
            <select name="countries" v-model="selected" placeholder="Select one">
               <option value="" selected disabled>Select a country from the list</option>
               <option :value="country" v-for="(country, i) in countries" :key="i">{{ country.name.common }}</option>
            </select>
         </div>
         <CardComponent v-if="selected" :country="selected" :watchlist="false" class="card" />
         <button v-if="selected" class="btn" type="submit" @click="addToWatchList(selected!)">Add to Watchlist</button>
      </div>
      <div class="map-container">
         <div class="header-primary" v-if="selected">{{ selected.name.official }}</div>
         <div class="map" id="map"></div>
      </div>
   </div>
</template>
<script setup lang="ts">
   import NavComponent from '../components/NavComponent.vue';
   // import SearchComponent from '@/components/SearchComponent.vue';
   import CardComponent from '@/components/CardComponent.vue';
   import Country from '@/Public/ICountry';
   import { onMounted, ref, watch } from 'vue';
   import axios from 'axios';
   import * as L from 'leaflet';
   import 'leaflet/dist/leaflet.css';
   import { BASE_URL } from './../main';

   const latitude = ref<number>();
   const longitude = ref<number>();
   const selected = ref<Country>();
   const countries = ref<Country[]>([]);
   const header: object = { 'Content-Type': 'application/json' };

   let map: L.Map;
   let marker: L.Marker;
   const customIcon = L.icon({
      iconUrl: require('../assets/icons/icon.png'),
      iconSize: [45, 45],
   });

   const setMap = (lat: number, long: number, zoom = 12) => {
      if (!map) {
         map = L.map('map', { attributionControl: false, zoomControl: false }).setView([lat, long], zoom);
         L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
            maxZoom: 18,
         }).addTo(map);
      } else {
         map.setView([lat, long], zoom);
      }
      if (!marker) {
         marker = L.marker([lat, long], { icon: customIcon }).addTo(map);
      } else {
         marker.setLatLng([lat, long]);
      }
   };

   const addToWatchList = async (country: Country) => {
      const res = (await axios.get(BASE_URL + 'countries')).data;
      let id: number;
      if (res.length === 0) id = 1;
      else {
         const lastID = res.at(-1).id;
         id = lastID + 1;
      }

      country.id = id;

      let exist = false;
      for (const r in res) {
         if (res[r].name.common.trim() === country.name.common.trim()) exist = true;
      }
      if (!exist) await axios.post(BASE_URL + 'countries', country, header);
      else return;
   };

   onMounted(async () => {
      try {
         const response = await axios.get('https://restcountries.com/v3.1/all');
         // eslint-disable-next-line @typescript-eslint/no-explicit-any
         countries.value = response.data.map((country: Country) => {
            return {
               name: country.name,
               capital: country.capital?.[0] ?? 'N/A',
               currencies: Object.keys(country.currencies ?? {}),
               region: country.region,
               // eslint-disable-next-line @typescript-eslint/no-unused-vars
               languages: Object.entries(country.languages ?? {}).map(([code, name]) => name),
               flags: country.flags.png,
               population: country.population.toLocaleString('en-US'),
               cca3: country.cca3,
               capitalInfo: country.capitalInfo,
               latlng: country.latlng,
               plannedDate: new Date(Date.now()),
            };
         });
         countries.value.sort((a, b) => a.name.common.localeCompare(b.name.common));
      } catch (err: unknown) {
         console.log(err);
      }
      if (navigator.geolocation) {
         // eslint-disable-next-line no-undef
         navigator.geolocation.getCurrentPosition((pos: GeolocationPosition): void => {
            latitude.value = pos.coords.latitude;
            longitude.value = pos.coords.longitude;
            setMap(latitude.value, longitude.value);

            watch(selected, (newValue, oldValue) => {
               if (newValue !== oldValue && selected.value) {
                  if (selected.value.capitalInfo.latlng) {
                     latitude.value = selected.value.capitalInfo.latlng[0];
                     longitude.value = selected.value.capitalInfo.latlng[1];
                     setMap(latitude.value, longitude.value);
                  } else {
                     latitude.value = selected.value.latlng[0];
                     longitude.value = selected.value.latlng[1];
                     setMap(latitude.value, longitude.value);
                  }
               }
            });
         });
      }
   });
</script>
<style lang="scss">
   .body {
      height: 85vh;
      background-image: linear-gradient(to right bottom, $color-dark--1, $color-dark--2);
      display: flex;
      padding: 0 1rem;
      align-items: center;
   }
   .select-container {
      width: 30%;
      height: 100%;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      gap: 3rem;

      &__inputs {
         display: flex;
         flex-direction: column;

         select {
            font-size: 1rem;
            text-align: center;
            background-image: linear-gradient(to right bottom, rgba($color-primary-light, 0.8), rgba($color-primary-dark, 0.8));
            outline: none;
            color: $color-dark--2;
         }
      }
   }
   .card {
      @include card($dark: false, $watchList: false);
   }
   .map-container {
      height: 90%;
      width: 70%;
      display: flex;
      flex-direction: column;
      justify-content: center;
   }

   .header-primary {
      font-size: 2.5rem;
      letter-spacing: 0.3rem;
      color: $color-grey-light-2;
      height: 10%;
      display: flex;
      justify-content: center;
      padding: 1rem;
   }
   #map {
      width: 100%;
      height: 90%;
      display: flex;
   }
</style>
