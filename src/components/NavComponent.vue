<template>
   <nav class="navbar" v-if="loggedIn">
      <ul class="navbar__nav">
         <li class="navbar__nav--item">
            <RouterLink class="navbar__nav--link" to="/">Home</RouterLink>
         </li>
         <li class="navbar__nav--item">
            <RouterLink class="navbar__nav--link" to="/Countries">Countries</RouterLink>
         </li>
         <li class="navbar__nav--item">
            <RouterLink class="navbar__nav--link" to="/MyCountries">My Watchlist</RouterLink>
         </li>
         <a href="" class="navbar__nav--item navbar__nav--link" @click="logout">Log Out</a>
      </ul>
   </nav>
   <nav class="navbar" v-else>
      <ul class="navbar__nav">
         <li class="navbar__nav--item">
            <RouterLink class="navbar__nav--link" to="/">Home</RouterLink>
         </li>
         <li class="navbar__nav--item">
            <RouterLink class="navbar__nav--link" to="/Countries">Countries</RouterLink>
         </li>
         <li class="navbar__nav--item">
            <RouterLink class="navbar__nav--link" to="/Login">Login</RouterLink>
         </li>
         <li class="navbar__nav--item">
            <RouterLink class="navbar__nav--link" to="/Register">Register</RouterLink>
         </li>
      </ul>
   </nav>
</template>
<script setup lang="ts">
   import { loggedIn } from '@/main';
   import router from '@/router';
   import { onMounted } from 'vue';

   const logout = () => {
      localStorage.removeItem('user');
      router.push('/home');
   };

   onMounted(async () => {
      const logged = loggedIn;
      if (logged) console.log('lol');
   });
</script>
<style lang="scss">
   .navbar {
      background-image: linear-gradient(to right bottom, rgba($color-primary-light, 0.8), rgba($color-primary-dark, 0.8));
      &__nav {
         border-bottom: 1px solid $color-grey-light-2;
         display: flex;
         gap: 3rem;
         list-style-type: none;
         align-items: center;
         justify-content: center;
         &--item {
            padding: 2rem;
            font-size: 1.4rem;
         }
         &--link {
            &,
            &:link,
            &:active {
               position: relative;
               text-transform: uppercase;
               text-decoration: none;
               color: $color-grey-light-1;
            }
            &:hover {
               transform: translateY(-3px);
               color: $color-grey-dark-1;
            }
         }
      }
   }
</style>
