<template>
  <div class="bg-black min-h-screen m-0 p-0">
  <NavBar />
  <HeroSection />
  <RecipeSection />
   <router-view />
   <CuisineSection />
   </div>
</template>

<script setup>
import NavBar from "./components/NavBar.vue";
import HeroSection from "./components/HeroSection.vue";
import RecipeSection from "./components/RecipeSection.vue";
import CuisineSection from "./components/CuisineSection.vue";
</script>