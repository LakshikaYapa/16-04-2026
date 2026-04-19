<template>
  <nav class="flex justify-between items-center p-4 bg-black text-white">
    
    <div class="flex items-center gap-2 cursor-pointer" @click="$router.push('/')">
      <img src="/logo/logo1.jpeg" class="h-16" />
    </div>

    <ul class="flex gap-10 text-lg font-medium items-center">
      <li @click="$router.push('/')" class="cursor-pointer hover:text-yellow-400">Home</li>

      <li class="cursor-pointer hover:text-yellow-400">Categories</li>

      <!-- 👇 Not logged -->
      <li 
        v-if="!isAuth"
        @click="$router.push('/login')" 
        class="cursor-pointer hover:text-yellow-400"
      >
        Login
      </li>

      <!-- 👇 Logged -->
      <li 
        v-else
        @click="logout" 
        class="cursor-pointer hover:text-red-400"
      >
        Logout
      </li>
    </ul>

  </nav>
</template>

<script>
export default {
  computed: {
    isAuth() {
      return localStorage.getItem("isAuth");
    }
  },
  methods: {
    logout() {
      localStorage.removeItem("isAuth");
      this.$router.push("/login");
    }
  }
};
</script>