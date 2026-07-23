<template>
  <div class="min-h-screen bg-black text-white">
    <NavBar v-if="!isAuthPage" />

    <main>
      <router-view />
    </main>
  </div>
</template>

<script lang="ts">
import NavBar from "./components/NavBar.vue";

export default {
  components: { NavBar },

  computed: {
    isAuthPage(): boolean {
      return ["/login", "/register"].includes(this.$route.path);
    },
  },
};
</script>