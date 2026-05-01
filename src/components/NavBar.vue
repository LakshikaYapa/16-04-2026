<script>
import SideMenu from "./SideMenu.vue";

export default {
  components: { SideMenu },

  data() {
    return {
      isAuth: false,
      role: "",
      showMenu: false
    };
  },

  mounted() {
    this.checkAuth();
  },

  methods: {
    checkAuth() {
      this.isAuth = localStorage.getItem("isAuth") === "true";
      this.role = localStorage.getItem("role") || "";
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
  <nav class="flex justify-between items-center px-8 py-4 bg-black text-white shadow-lg">

    <!-- Logo -->
    <div class="flex items-center gap-2 cursor-pointer" @click="$router.push('/')">
      <img src="/logo/logo1.jpeg" class="h-16 hover:scale-105 transition" />
    </div>

    <!-- Menu -->
    <ul class="flex gap-8 text-lg font-medium items-center">

      <li @click="$router.push('/')" class="nav-item">
        Home
      </li>

      <!-- 🔥 Categories -->
      <li @click="showMenu = true" class="nav-item">
        Categories
      </li>

      <!-- NOT LOGGED -->
      <li 
        v-if="!isAuth"
        @click="$router.push('/login')" 
        class="nav-item"
      >
        Login
      </li>

      <!-- LOGGED -->
      <li 
        v-if="isAuth"
        @click="logout" 
        class="nav-item text-red-400 hover:text-red-500"
      >
        Logout
      </li>

      <!-- ADMIN -->
      <li 
        v-if="isAuth && role === 'admin'"
        @click="$router.push('/admin')" 
        class="nav-item text-green-400 hover:text-green-500"
      >
        Admin
      </li>

    </ul>
  </nav>

  <!-- 🔥 SIDE MENU -->
  <div v-if="showMenu" class="fixed inset-0 z-50 flex">

    <!-- overlay -->
    <div 
      class="bg-black/60 w-full backdrop-blur-sm"
      @click="showMenu = false"
    ></div>

    <!-- sidebar with animation -->
    <SideMenu 
      @close="showMenu = false"
      class="animate-slide"
    />

  </div>
</template>

<style scoped>
/* 🔥 NAV ITEM STYLE */
.nav-item {
  cursor: pointer;
  position: relative;
  transition: color 0.3s ease;
}

.nav-item:hover {
  color: #facc15;
}

/* underline animation */
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

/* 🔥 SIDEBAR SLIDE */
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