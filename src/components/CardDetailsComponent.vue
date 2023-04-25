<template>
   <div>
      <span class="key">Name:</span><span class="value"> &nbsp;{{ country.name.common }}</span>
   </div>
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
</template>
<script lang="ts" setup>
   import { defineProps } from 'vue';
   defineProps(['country', 'watchlist']);
</script>
