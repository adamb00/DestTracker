<template>
   <NavComponent />
   <div class="my-countries__container">
      <div class="my-countries__row">
         <div class="my-countries__cards" v-for="(country, i) in countriesList" :key="i">
            <CardComponent :country="country" :save="save" :remove="remove" :watchlist="true" :plannedDate="plannedDate" class="card" />
         </div>
      </div>
   </div>
</template>
<script setup lang="ts">
   import NavComponent from '../components/NavComponent.vue';
   import CardComponent from '../components/CardComponent.vue';
   import Country from '@/Public/ICountry';
   import { BASE_URL } from '@/main';
   import axios from 'axios';
   import { onMounted, ref, inject } from 'vue';

   const countriesList = ref<Set<Country>>(new Set());
   const plannedDate = ref<string>('');

   // plannedDate.value = inject<string>('plannedDate');

   const remove = async (country: Country) => {
      await axios.delete(BASE_URL + 'countries' + '/' + country.id);
      countriesList.value.delete(country);
   };
   const save = async (country: Country) => {
      console.log(plannedDate.value);
      await axios.put(BASE_URL + 'countries' + '/' + country.id, { ...country, plannedDate: plannedDate.value });
   };

   onMounted(async () => {
      const watchlist = (await axios.get(BASE_URL + 'countries')).data;
      for (const i of watchlist) {
         countriesList.value.add(i);
      }
   });
</script>
<style lang="scss">
   .my-countries {
      &__row {
         display: grid;
         grid-template-columns: repeat(3, minmax(5rem, 1fr));
         gap: 2rem;
         .card {
            @include card($dark: true, $watchList: true);
         }
      }
   }
</style>
