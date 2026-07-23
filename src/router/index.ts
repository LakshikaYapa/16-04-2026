import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/Home.vue";
import About from "../views/About.vue";
import ShoppingList from "../views/ShoppingList.vue";
import RecipeDetails from "../views/RecipeDetails.vue";
import RecipeFullDetails from "../views/RecipeFullDetails.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import MyRecipes from "../views/MyRecipes.vue";
import Favorites from "../views/Favorites.vue";

const routes = [
  {
    path: "/",
    component: Home,
  },

  {
    path: "/about",
    component: About,
  },

  {
    path: "/recipes/:type",
    component: RecipeDetails,
    meta: {
      requiresAuth: true,
    },
  },

  {
    path: "/recipe/:id",
    component: RecipeFullDetails,
  },

  {
    path: "/shopping-list",
    component: ShoppingList,
  },

  {
    path: "/favorites",
    component: Favorites,
  },

  {
    path: "/my-recipes",
    component: MyRecipes,
  },

  {
    path: "/login",
    component: Login,
  },

  {
    path: "/register",
    component: Register,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,

  scrollBehavior: () => ({
    top: 0,
  }),
});

router.beforeEach((to, _from, next) => {
  const isAuth = localStorage.getItem("isAuth");

  if (to.meta.requiresAuth && !isAuth) {
    alert("You need to login first");
    next("/login");
  } else {
    next();
  }
});

export default router;