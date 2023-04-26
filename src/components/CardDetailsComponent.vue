<template>
   <h2 class="heading-secondary">{{ country.name.common }}</h2>
   <div>
      <span class="key">Capital:</span><span class="value"> &nbsp;{{ country.capital }}</span>
   </div>

   <div>
      <span class="key">Population:</span><span class="value">&nbsp;{{ country.population }}</span>
   </div>
   <div>
      <span class="key">Region:</span><span class="value"> &nbsp;{{ country.region }}</span>
   </div>

   <div class="card--languages">
      <span class="key">Languages:</span
      ><span class="value">
         &nbsp;{{
            Object.values(country.languages)
               .map(name => name)
               .join(', ')
         }}</span
      >
   </div>
   <div>
      <span class="key">Currencies:</span
      ><span class="value"
         >&nbsp;
         {{
            Object.values(country.currencies)
               .map(name => name)
               .join(', ')
         }}</span
      >
   </div>
   <button v-if="loggedIn && !watchlist" class="btn" type="submit" @click="addToWatchList(country), addToMostRelevant(country)">Add to Watchlist</button>
</template>
<script lang="ts" setup>
   import { BASE_URL } from '@/main';
   import Country from '@/stores/ICountry';
   import User from '@/stores/IUser';
   import { useCounterStore } from '@/stores/ServiceStore';
   import axios from 'axios';
   import { defineProps, ref } from 'vue';

   const userState = useCounterStore().user;
   const loggedIn = ref(userState);
   defineProps(['country', 'watchlist']);

   const addToWatchList = async (country: Country) => {
      if (loggedIn.value) {
         const user: User = (await axios.get(BASE_URL + 'users' + '/' + loggedIn.value.id)).data;
         let exist = false;
         user.countries.forEach(x => {
            if (x.name.common === country.name.common) exist = true;
         });

         if (!exist) {
            user.countries.push(country);
            loggedIn.value.countries.push(country);
            try {
               await axios.patch(BASE_URL + 'users' + '/' + user.id, user);
            } catch (err) {
               console.log(err);
            }
         }
      }
   };

   const addToMostRelevant = async (country: Country) => {
      const res = (await axios.get(BASE_URL + 'most-relevant')).data;
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
      !exist ? await axios.post(BASE_URL + 'most-relevant', country) : '';
   };
</script>
<style lang="scss"></style>
