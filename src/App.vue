<template>
  <NavBar />
  <HeroSection />
  <RecipeSection />
   <router-view />
</template>

<script setup>
import NavBar from "./components/NavBar.vue";
import HeroSection from "./components/HeroSection.vue";
import RecipeSection from "./components/RecipeSection.vue";
</script>