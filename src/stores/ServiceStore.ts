import { ref } from 'vue';
import { defineStore } from 'pinia';
import User from '@/stores/IUser';

export const useCounterStore = defineStore('counter', () => {
   const user = ref<User>();
   return { user };
});
