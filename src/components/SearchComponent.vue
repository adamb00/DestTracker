<template>
   <input type="text" placeholder="Search for a country" v-model="inputField" @keydown="searchFor" />
</template>
<script setup lang="ts">
   import { onMounted, ref } from 'vue';
   import Country from '@/Public/ICountry';
   import axios from 'axios';

   const inputField = ref<string>('');
   const selectedCountry = ref<Country>();

   const searchFor = async () => {
      if (inputField.value) {
         try {
            const response = (await axios.get(`https://restcountries.com/v3.1/name/${inputField.value}`)).data;
            selectedCountry.value = response[0];
         } catch (error) {
            console.error(error);
         }
      }
   };
   onMounted(async () => {
      searchFor();
   });
</script>
<style lang="scss">
   input {
      background-image: linear-gradient(to right bottom, rgba($color-primary-light, 0.8), rgba($color-primary-dark, 0.8));
      border: none;
      border-radius: 0.2rem;
      font-size: 1rem;
      outline: none;
      padding: 0.8rem;

      &::placeholder {
         color: $color-dark--2;
      }
   }
</style>
