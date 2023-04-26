<template>
   <NavComponent />
   <div class="my-countries__container">
      <div class="my-countries__row">
         <div class="my-countries__card" v-for="(country, i) in countriesList" :key="i">
            <div class="my-countries__card--details">
               <CardDetailsComponent :country="country" />
               <div class="my-countries__card--date">
                  <label for="plannedDate" class="key">Select a date: </label>
                  <input type="date" name="plannedDate" v-model="country.plannedDate" class="value" />
               </div>
               <div class="my-countries__card--buttons">
                  <button class="btn" @click="save(country)">Save</button>
                  <button class="btn btn--remove" @click="remove(country)">Remove</button>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>
<script setup lang="ts">
   import NavComponent from '../components/NavComponent.vue';
   import CardDetailsComponent from '@/components/CardDetailsComponent.vue';
   import Country from '@/Public/ICountry';
   import { BASE_URL } from '@/main';
   import axios from 'axios';
   import { onMounted, ref } from 'vue';
   import { useCounterStore } from '@/stores/ServiceStore';
   import User from '@/Public/IUser';

   const userState = useCounterStore().user;
   const loggedIn = ref(userState);
   const countriesList = ref<Set<Country>>(new Set());

   const remove = async (country: Country) => {
      const user: User = (await axios.get(BASE_URL + 'users' + '/' + loggedIn.value?.id)).data;
      if (loggedIn.value) {
         try {
            const countries = user.countries.filter(i => i.name.common !== country.name.common);
            const data = {
               id: user.id,
               email: user.email,
               name: user.name,
               countries,
            };
            await axios.patch(BASE_URL + 'users' + '/' + loggedIn.value.id, data);
            while (loggedIn.value.countries.length !== 0) loggedIn.value.countries.pop();
            countriesList.value.clear();
            countries.forEach(async x => {
               countriesList.value.add(x);
               loggedIn.value?.countries.push(x);
            });
         } catch (err) {
            console.log(err);
         }
      }
   };
   const save = async (country: Country) => {
      if (loggedIn.value) {
         const user: User = (await axios.get(BASE_URL + 'users' + '/' + loggedIn.value?.id)).data;
         try {
            const c = user.countries.find(x => x.name.common === country.name.common);
            if (c) c.plannedDate = country.plannedDate;
            const data = {
               id: user.id,
               email: user.email,
               name: user.name,
               countries: user.countries,
            };
            await axios.patch(BASE_URL + 'users' + '/' + loggedIn.value.id, data);
         } catch (err) {
            console.log(err);
         }
      }
   };

   onMounted(async () => {
      const watchlist = (await axios.get(BASE_URL + 'users')).data;

      if (loggedIn.value) {
         for (const i in watchlist) {
            if (watchlist[i].id === loggedIn.value.id) {
               for (const j in watchlist[i].countries) {
                  countriesList.value.add(watchlist[i].countries[j]);
               }
            }
         }
      }
   });
</script>
<style lang="scss">
   .my-countries {
      &__row {
         display: grid;
         grid-template-columns: repeat(3, minmax(5rem, 1fr));
         gap: 2rem;
      }
      &__card {
         @include card($dark: true, $watchList: false);

         &--date {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 2rem;
            .key {
               color: $color-primary;
               font-size: 1.5rem;
            }
            .value {
               &,
               &:active,
               &:visited {
                  font-size: 1.4rem;
                  font-style: italic;
                  border: none;
                  color: currentColor;
               }
            }
         }
      }
   }
</style>
