import {
  createRouter,
  createWebHistory,
} from "vue-router";
import type {
  RouteRecordRaw,
} from "vue-router";

import Home from "../views/Home.vue";
import About from "../views/About.vue";
import ShoppingList from "../views/ShoppingList.vue";
import RecipeDetails from "../views/RecipeDetails.vue";
import RecipeFullDetails from "../views/RecipeFullDetails.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Favorites from "../views/Favorites.vue";

/*
  Strictly typed application routes.
*/
const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "home",
    component: Home,
  },

  {
    path: "/about",
    name: "about",
    component: About,
  },

  /*
    Recipe categories can be viewed
    without logging in.
  */
  {
    path: "/recipes/:type",
    name: "recipe-category",
    component: RecipeDetails,
  },

  /*
    Full recipe details can also be viewed
    without logging in.
  */
  {
    path: "/recipe/:id",
    name: "recipe-details",
    component: RecipeFullDetails,
  },

  /*
    Only logged-in users can view their
    Shopping List.
  */
  {
    path: "/shopping-list",
    name: "shopping-list",
    component: ShoppingList,
    meta: {
      requiresAuth: true,
    },
  },

  /*
    Only logged-in users can view their
    favorite recipes.
  */
  {
    path: "/favorites",
    name: "favorites",
    component: Favorites,
    meta: {
      requiresAuth: true,
    },
  },

  /*
    Logged-in users do not need to reopen
    the Login page.
  */
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      guestOnly: true,
    },
  },

  /*
    Logged-in users do not need to reopen
    the Register page.
  */
  {
    path: "/register",
    name: "register",
    component: Register,
    meta: {
      guestOnly: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,

  scrollBehavior: () => ({
    top: 0,
    behavior: "smooth",
  }),
});

/*
  Global authentication guard.
*/
router.beforeEach((to) => {
  const isAuthenticated =
    localStorage.getItem("isAuth") === "true";

  /*
    Sends unauthenticated users to Login when
    they attempt to open Favorites or Shopping List.
  */
  if (
    to.meta.requiresAuth &&
    !isAuthenticated
  ) {
    return {
      name: "login",
      query: {
        redirect: to.fullPath,
      },
    };
  }

  /*
    Sends authenticated users away from
    Login and Register pages.
  */
  if (
    to.meta.guestOnly &&
    isAuthenticated
  ) {
    return {
      name: "home",
    };
  }

  return true;
});

export default router;