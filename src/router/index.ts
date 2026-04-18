import { createRouter, createWebHistory } from 'vue-router';

import Home from '../views/Home.vue';
import RecipeDetails from '../views/RecipeDetails.vue';

const routes = [
  { path: '/', component: Home }, // 🔥 NOW HOME
  { path: '/recipes/:type', component: RecipeDetails },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;