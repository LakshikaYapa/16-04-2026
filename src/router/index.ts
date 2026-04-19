import { createRouter, createWebHistory } from 'vue-router';

import Home from '../views/Home.vue';
import RecipeDetails from '../views/RecipeDetails.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import RecipeFullDetails from "../views/RecipeFullDetails.vue";

const routes = [
  { path: '/', component: Home },

  // 🔒 Protect this route
  { 
    path: '/recipes/:type', 
    component: RecipeDetails,
    meta: { requiresAuth: true }
  },

  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: "/recipe/:id", component: RecipeFullDetails },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 🔐 Route Guard
router.beforeEach((to, from, next) => {
  const isAuth = localStorage.getItem("isAuth");

  // If route needs auth
  if (to.meta.requiresAuth && !isAuth) {
    alert("you want to login first ");
    next('/login');
  } else {
    next();
  }
});

export default router;