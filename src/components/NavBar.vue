<script>
export default {
  data() {
    return {
      isAuth: false,
      role: ""
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
  <nav class="flex justify-between items-center p-4 bg-black text-white">
    
    <div class="flex items-center gap-2 cursor-pointer" @click="$router.push('/')">
      <img src="/logo/logo1.jpeg" class="h-16" />
    </div>

    <ul class="flex gap-10 text-lg font-medium items-center">

      <li @click="$router.push('/')" class="cursor-pointer hover:text-yellow-400">
        Home
      </li>

      <li class="cursor-pointer hover:text-yellow-400">
        Categories
      </li>

      <!-- 🔥 NOT LOGGED -->
      <li 
        v-if="!isAuth"
        @click="$router.push('/login')" 
        class="cursor-pointer hover:text-yellow-400"
      >
        Login
      </li>

      <!-- 🔥 LOGGED -->
      <li 
        v-if="isAuth"
        @click="logout" 
        class="cursor-pointer hover:text-red-400"
      >
        Logout
      </li>

      <!-- 🔥 ADMIN -->
      <li 
        v-if="isAuth && role === 'admin'"
        @click="$router.push('/admin')" 
        class="cursor-pointer hover:text-green-400"
      >
        Admin
      </li>

    </ul>
  </nav>
</template>