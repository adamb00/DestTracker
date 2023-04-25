<template>
   <div class="card" v-if="!watchlist">
      <div class="card--image" :style="{ backgroundImage: 'url(' + country.flags + ')', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }"></div>
      <div class="card--details">
         <CardDetailsComponent :country="country" />
      </div>
   </div>
   <div class="card" v-else>
      <div class="card--details">
         <CardDetailsComponent :country="country" />
         <div class="date">
            <label for="plannedDate" class="key">Select a date: </label>
            <input type="date" name="plannedDate" v-model="plannedDate" class="value" style="border: none" />
         </div>
      </div>
      <div class="card--buttons">
         <button class="btn" @click="save(country)">Save</button>
         <button class="btn btn--remove" @click="remove(country)">Remove</button>
      </div>
   </div>
</template>
<script lang="ts" setup>
   import { defineProps, provide, ref } from 'vue';
   import CardDetailsComponent from './CardDetailsComponent.vue';
   defineProps(['country', 'watchlist', 'save', 'remove', 'plannedDate']);
   const plannedDate = ref<string>('');

   console.log(plannedDate.value);

   provide('plannedDate', plannedDate.value);
</script>
