import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
   {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
   },
   {
      path: '/countries',
      name: 'countries',
      component: () => import('../views/CountriesView.vue'),
   },
   {
      path: '/mycountries',
      name: 'mycountries',
      component: () => import('../views/MyCountriesView.vue'),
   },
   {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
   },
   {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue'),
   },
];

const router = createRouter({
   history: createWebHashHistory(),
   routes,
});

export default router;
