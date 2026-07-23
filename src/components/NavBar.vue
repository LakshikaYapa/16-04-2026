<script>
import SideMenu from "./SideMenu.vue";

export default {
  components: { SideMenu },

  data() {
    return {
      isAuth: false,
      role: "",
      showMenu: false,
      showMobileMenu: false,
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

    closeMobileAndGo(path) {
      this.$router.push(path);
      this.showMobileMenu = false;
    },

    openCategories() {
      this.showMenu = true;
      this.showMobileMenu = false;
    },

    logout() {
      localStorage.removeItem("isAuth");
      localStorage.removeItem("role");

      this.isAuth = false;
      this.role = "";
      this.showMobileMenu = false;

      this.$router.push("/");
    },
  },
};
</script>

<template>
  <nav
    class="sticky top-0 z-40 border-b border-white/10 bg-black/95 text-white shadow-lg backdrop-blur"
  >
    <div
      class="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
    >
      <!-- Logo -->
      <div
        class="flex cursor-pointer items-center gap-2"
        @click="$router.push('/')"
      >
        <img
          src="/logo/logo1.jpeg"
          alt="Kitchen Magic"
         class="h-16 w-auto rounded-lg object-contain transition hover:scale-105 sm:h-20 lg:h-24"   
        />
      </div>

      <!-- Desktop Menu -->
      <ul
        class="hidden items-center gap-6 text-sm font-medium lg:flex xl:gap-8 xl:text-base"
      >
        <li @click="$router.push('/')" class="nav-item">
          Home
        </li>

        <li @click="showMenu = true" class="nav-item">
          Categories
        </li>

        <li @click="$router.push('/about')" class="nav-item">
          About
        </li>

        <li
          @click="$router.push('/shopping-list')"
          class="nav-item text-yellow-400"
        >
          🛒 Shopping List

          <span
            v-if="shoppingCount > 0"
            class="ml-1 rounded-full bg-red-500 px-2 py-1 text-xs text-white"
          >
            {{ shoppingCount }}
          </span>
        </li>

        <li
          @click="$router.push('/favorites')"
          class="nav-item text-pink-400"
        >
          ❤️ Favorites

          <span
            v-if="favoriteCount > 0"
            class="ml-1 rounded-full bg-pink-600 px-2 py-1 text-xs text-white"
          >
            {{ favoriteCount }}
          </span>
        </li>

        <li
          v-if="!isAuth"
          @click="$router.push('/login')"
          class="nav-item"
        >
          Login
        </li>

        <li
          v-if="isAuth"
          @click="logout"
          class="nav-item text-red-400 hover:text-red-500"
        >
          Logout
        </li>

        <li
          v-if="isAuth && role === 'admin'"
          @click="$router.push('/admin')"
          class="nav-item text-green-400 hover:text-green-500"
        >
          Admin
        </li>
      </ul>

      <!-- Mobile Menu Button -->
      <button
        class="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-2xl transition hover:bg-white/10 lg:hidden"
        :aria-expanded="showMobileMenu"
        aria-label="Open navigation menu"
        @click="showMobileMenu = !showMobileMenu"
      >
        {{ showMobileMenu ? "✕" : "☰" }}
      </button>
    </div>
  </nav>

  <!-- Mobile Navigation -->
  <div
    v-if="showMobileMenu"
    class="fixed inset-x-0 top-20 z-40 max-h-[calc(100svh-5rem)] overflow-y-auto border-b border-white/10 bg-gray-950 px-5 py-5 shadow-2xl lg:hidden"
  >
    <div class="mx-auto flex max-w-7xl flex-col gap-2">
      <button
        class="mobile-link"
        @click="closeMobileAndGo('/')"
      >
        Home
      </button>

      <button
        class="mobile-link"
        @click="openCategories"
      >
        Categories
      </button>

      <button
        class="mobile-link"
        @click="closeMobileAndGo('/about')"
      >
        About
      </button>

      <button
        class="mobile-link text-yellow-300"
        @click="closeMobileAndGo('/shopping-list')"
      >
        🛒 Shopping List
        <span v-if="shoppingCount">({{ shoppingCount }})</span>
      </button>

      <button
        class="mobile-link text-pink-300"
        @click="closeMobileAndGo('/favorites')"
      >
        ❤️ Favorites
        <span v-if="favoriteCount">({{ favoriteCount }})</span>
      </button>

      <button
        v-if="!isAuth"
        class="mobile-link"
        @click="closeMobileAndGo('/login')"
      >
        Login
      </button>

      <button
        v-else
        class="mobile-link text-red-300"
        @click="logout"
      >
        Logout
      </button>
    </div>
  </div>

  <!-- Category Side Menu -->
  <div
    v-if="showMenu"
    class="fixed inset-0 z-50 flex"
  >
    <SideMenu
      @close="showMenu = false"
      class="animate-slide"
    />

    <div
      class="h-full flex-1 bg-black/60 backdrop-blur-sm"
      @click="showMenu = false"
    ></div>
  </div>
</template>

<style scoped>
.nav-item {
  position: relative;
  cursor: pointer;
  transition: color 0.3s ease;
}

.nav-item:hover {
  color: #facc15;
}

.nav-item::after {
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 2px;
  background: #facc15;
  content: "";
  transition: width 0.3s ease;
}

.nav-item:hover::after {
  width: 100%;
}

.mobile-link {
  width: 100%;
  border-radius: 0.75rem;
  padding: 0.8rem 1rem;
  text-align: left;
  font-weight: 600;
  transition: background 0.2s ease;
}

.mobile-link:hover {
  background: rgba(255, 255, 255, 0.08);
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