<script>
import SideMenu from "./SideMenu.vue";

export default {
  components: { SideMenu },

  data() {
    return {
      isAuth: false,
      role: "",
      showMenu: false,

      shoppingCount: 0,
      favoriteCount: 0,
    };
  },

  mounted() {
    this.checkAuth();

    this.loadShoppingCount();
    this.loadFavoriteCount();

    window.addEventListener("focus", this.loadShoppingCount);
    window.addEventListener("focus", this.loadFavoriteCount);

    window.addEventListener("storage", this.loadShoppingCount);
    window.addEventListener("storage", this.loadFavoriteCount);
  },

  beforeUnmount() {
    window.removeEventListener("focus", this.loadShoppingCount);
    window.removeEventListener("focus", this.loadFavoriteCount);

    window.removeEventListener("storage", this.loadShoppingCount);
    window.removeEventListener("storage", this.loadFavoriteCount);
  },

  methods: {

    checkAuth() {
      this.isAuth = localStorage.getItem("isAuth") === "true";
      this.role = localStorage.getItem("role") || "";
    },

    loadShoppingCount() {

      const list = JSON.parse(
        localStorage.getItem("shoppingList") || "[]"
      );

      this.shoppingCount = list.length;

    },

    loadFavoriteCount() {

      const list = JSON.parse(
        localStorage.getItem("favorites") || "[]"
      );

      this.favoriteCount = list.length;

    },

    logout() {

      localStorage.removeItem("isAuth");
      localStorage.removeItem("role");

      this.isAuth = false;
      this.role = "";

      this.$router.push("/");

    }

  }
};
</script>

<template>
  <nav
    class="flex justify-between items-center px-8 py-4 bg-black text-white shadow-lg"
  >

    <!-- Logo -->
    <div
      class="flex items-center gap-2 cursor-pointer"
      @click="$router.push('/')"
    >
      <img
        src="/logo/logo1.jpeg"
        class="h-16 hover:scale-105 transition"
      />
    </div>

    <!-- Menu -->
    <ul class="flex gap-8 text-lg font-medium items-center">

      <!-- Home -->
      <li
        @click="$router.push('/')"
        class="nav-item"
      >
        Home
      </li>

      <!-- Categories -->
      <li
        @click="showMenu = true"
        class="nav-item"
      >
        Categories
      </li>

      <!-- Shopping -->
      <li
        @click="$router.push('/shopping-list')"
        class="nav-item text-yellow-400"
      >
        🛒 Shopping List

        <span
          v-if="shoppingCount > 0"
          class="ml-1 bg-red-500 text-white text-xs px-2 py-1 rounded-full"
        >
          {{ shoppingCount }}
        </span>

      </li>

      <!-- Favorites -->
      <li
        @click="$router.push('/favorites')"
        class="nav-item text-pink-400"
      >
        ❤️ Favorites

        <span
          v-if="favoriteCount > 0"
          class="ml-1 bg-pink-600 text-white text-xs px-2 py-1 rounded-full"
        >
          {{ favoriteCount }}
        </span>

      </li>

      <!-- Login -->
      <li
        v-if="!isAuth"
        @click="$router.push('/login')"
        class="nav-item"
      >
        Login
      </li>

      <!-- Logout -->
      <li
        v-if="isAuth"
        @click="logout"
        class="nav-item text-red-400 hover:text-red-500"
      >
        Logout
      </li>

      <!-- Admin -->
      <li
        v-if="isAuth && role === 'admin'"
        @click="$router.push('/admin')"
        class="nav-item text-green-400 hover:text-green-500"
      >
        Admin
      </li>

    </ul>

  </nav>

  <!-- Side Menu -->
  <div
    v-if="showMenu"
    class="fixed inset-0 z-50 flex"
  >

    <div
      class="bg-black/60 w-full backdrop-blur-sm"
      @click="showMenu = false"
    ></div>

    <SideMenu
      @close="showMenu = false"
      class="animate-slide"
    />

  </div>
</template>

<style scoped>
.nav-item {
  cursor: pointer;
  position: relative;
  transition: color 0.3s ease;
}

.nav-item:hover {
  color: #facc15;
}

.nav-item::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -4px;
  width: 0%;
  height: 2px;
  background: #facc15;
  transition: width 0.3s ease;
}

.nav-item:hover::after {
  width: 100%;
}

@keyframes slideIn {
  from {
    transform: translateX(-100%);
  }

  to {
    transform: translateX(0);
  }
}

.animate-slide {
  animation: slideIn 0.3s ease forwards;
}
</style>