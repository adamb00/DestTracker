<template>
   <NavComponent />
   <h1 class="heading-primary">Most relevant destinations</h1>
   <div class="home-container">
      <div class="home-container__row">
         <div class="home-container__card" v-for="(country, i) in countriesList" :key="i">
            <CardComponent :country="country" :watchlist="false" class="card" />
         </div>
      </div>
   </div>
</template>

<script setup lang="ts">
   import NavComponent from '../components/NavComponent.vue';
   import CardComponent from '@/components/CardComponent.vue';
   import { ref, onMounted } from 'vue';
   import axios from 'axios';
   import { BASE_URL } from '@/main';
   import Country from '@/Public/ICountry';

   const countriesList = ref<Set<Country>>(new Set());

   onMounted(async () => {
      const mostRelevant: Country[] = (await axios.get(BASE_URL + 'most-relevant')).data;
      for (const i of mostRelevant.slice(-6)) {
         countriesList.value.add(i);
      }
   });
</script>
<style lang="scss">
   .home-container {
      &__row {
         display: grid;
         grid-template-columns: repeat(3, minmax(5rem, 1fr));
         gap: 2rem;
         .card {
            @include card($dark: true, $watchList: false);
            padding: 3rem;
         }
      }
   }
</style>
