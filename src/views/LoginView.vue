<template>
   <NavComponent />

   <div class="login">
      <form action="login" class="login__form">
         <div class="login__form--email">
            <label for="email">Enter Your Email: </label>
            <input type="text" name="email" id="email" placeholder="Your Email" v-model="email" />
         </div>
         <div class="login__form--pwd">
            <label for="pwd">Enter Your Password: </label>
            <input type="password" name="pwd" id="pwd" placeholder="Your Password" v-model="pwd" />
         </div>
      </form>

      <a class="btn" @click="login">Sign In</a>
   </div>
</template>
<script setup lang="ts">
   import NavComponent from '../components/NavComponent.vue';
   import { useCounterStore } from '@/stores/ServiceStore';
   import User from '../Public/IUser';
   import { ref } from 'vue';
   import { BASE_URL } from '@/main';
   import axios from 'axios';
   import { useRouter } from 'vue-router';

   const email = ref<string>('');
   const pwd = ref<string>('');

   const userStore = useCounterStore();
   const router = useRouter();

   const login = async () => {
      const res = (await axios.get(BASE_URL + 'users')).data;
      const exist: User = res.find((x: User) => x.email == email.value);

      if (exist && exist.password === pwd.value) {
         userStore.user = exist;
         router.replace('/');
      } else if (!exist) alert('Please register first');
      else if (exist.password !== pwd.value) alert('Passwords are not the same');
   };
</script>
<style lang="scss">
   .login {
      border: 1px solid $color-grey-dark-2;
      border-radius: 0.2rem;
      padding: 5rem;
      max-width: 50%;
      position: relative;
      display: flex;
      flex-direction: column;
      left: 50%;
      transform: translateX(-50%);

      &__form {
         div {
            display: flex;
            flex-direction: column;
            margin-bottom: 2rem;

            label {
               font-size: 1.6rem;
               color: $color-primary;
               padding: 0 0 0.2rem 0.4rem;
            }

            input {
               font-size: 1.6rem;
               outline: none;
               border-radius: 1rem;
               padding: 0.8rem;
               color: $color-primary;
               border: 1px solid $color-grey-dark-2;
            }
         }
      }
   }
</style>
