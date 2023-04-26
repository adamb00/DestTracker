<template>
   <div class="card" v-if="!watchlist">
      <div class="card--image" :style="{ backgroundImage: 'url(' + country.flags + ')', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }"></div>
      <div class="card--details">
         <CardDetailsComponent :country="country" :watchlist="watchlist" />
      </div>
   </div>
</template>
<script lang="ts" setup>
   import { defineProps } from 'vue';
   import CardDetailsComponent from './CardDetailsComponent.vue';
   defineProps(['country', 'watchlist']);
</script>
<style lang="scss">
   .card {
      @include card($watchList: false);
   }
</style>
