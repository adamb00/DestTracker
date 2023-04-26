<template>
   <NavComponent />

   <div class="register">
      <form action="register" class="register__form">
         <div class="register__form--name">
            <label for="name">Enter Your Name: </label>
            <input type="text" name="name" id="name" placeholder="Full Name" v-model="name" />
         </div>
         <div class="register__form--email">
            <label for="email">Enter Your Email: </label>
            <input type="text" name="email" id="email" placeholder="Your Email" v-model="email" />
         </div>
         <div class="register__form--pwd">
            <label for="pwd">Enter Your Password: </label>
            <input type="password" name="pwd" id="pwd" placeholder="Your Password" v-model="pwd" />
         </div>
         <div class="register__form--pwdAgain">
            <label for="pwdAgain">Enter Your Password Again:</label>
            <input type="password" name="pwdAgain" id="pwdAgain" placeholder="Your Password Again" v-model="pwdAgain" />
         </div>
      </form>

      <a class="btn" @click="register">Sign Up</a>
   </div>
</template>
<script setup lang="ts">
   import NavComponent from '../components/NavComponent.vue';

   import User from '../stores/IUser';
   import { ref } from 'vue';
   import { BASE_URL } from '@/main';
   import axios from 'axios';

   const header: object = { 'Content-Type': 'application/json' };
   const name = ref<string>();
   const email = ref<string>();
   const pwd = ref<string>();
   const pwdAgain = ref<string>();

   const register = async () => {
      const users: User[] = (await axios.get(BASE_URL + 'users')).data;
      const usersId = users.map((x: User) => x.id);

      if (name.value && email.value && pwd.value) {
         const user: User = {
            id: Math.max(...usersId) + 1,
            name: name.value,
            email: email.value,
            password: pwd.value,
            countries: [],
         };
         let exist = false;
         users.forEach(x => {
            if (x.email === email.value) exist = true;
         });
         if (!exist && pwd.value === pwdAgain.value) {
            await axios.post(BASE_URL + 'users', user, header);
            alert('Successfully registered');
         } else if (pwd.value !== pwdAgain.value) {
            alert('Passwords are not equal');
         } else if (exist) {
            alert('Email already registered');
         }
      }
   };
</script>
<style lang="scss">
   .register {
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
