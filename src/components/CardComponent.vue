<template>
   <div class="card" v-if="!watchlist">
      <div class="card--image" :style="{ backgroundImage: 'url(' + country.flags + ')', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }"></div>
      <div class="card--details">
         <CardDetailsComponent :country="country" />
      </div>
   </div>
</template>
<script lang="ts" setup>
   import { defineProps } from 'vue';
   import CardDetailsComponent from './CardDetailsComponent.vue';
   defineProps(['country', 'watchlist']);
</script>
