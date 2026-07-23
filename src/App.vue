<template>
  <div class="min-h-screen bg-black text-white">
    <NavBar v-if="!isAuthPage" />
    <main>
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import NavBar from "./components/NavBar.vue";

const route = useRoute();
const isAuthPage = computed(() => ["/login", "/register"].includes(route.path));
</script>
