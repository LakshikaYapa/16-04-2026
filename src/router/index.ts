import { createRouter, createWebHistory } from 'vue-router';
import ShoppingList from "../views/ShoppingList.vue";
import Home from '../views/Home.vue';
import RecipeDetails from '../views/RecipeDetails.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import RecipeFullDetails from "../views/RecipeFullDetails.vue";

// NEW IMPORT
import MyRecipes from "../views/MyRecipes.vue";

const routes = [
  {
    path: '/',
    component: Home
  },

  {
    path: '/recipes/:type',
    component: RecipeDetails,
    meta: {
      requiresAuth: true
    }
  },

  {
  path: "/shopping-list",
  component: ShoppingList
  },
  
  {
    path: '/login',
    component: Login
  },

  {
    path: '/register',
    component: Register
  },

  {
    path: "/recipe/:id",
    component: RecipeFullDetails
  },

  // NEW PAGE
  {
    path: "/my-recipes",
    component: MyRecipes
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// AUTH GUARD
router.beforeEach((to, from, next) => {

  const isAuth = localStorage.getItem("isAuth");

  if (to.meta.requiresAuth && !isAuth) {

    alert("You want to login first");

    next('/login');

  } else {

    next();

  }

});

export default router;