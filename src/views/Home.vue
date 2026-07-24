<script setup lang="ts">
import AboutSection from "../components/AboutSection.vue";
import CuisineSection from "../components/CuisineSection.vue";
import Dietary from "../components/Dietary.vue";
import HeroSection from "../components/HeroSection.vue";
import MealsSection from "../components/mealsSection.vue";
import RecipeOfTheDay from "../components/RecipeOfTheDay.vue";
import SearchBar from "../components/SearchBar.vue";
</script>

<template>
  <main class="min-h-screen bg-black">
    <HeroSection />

    <SearchBar />

    <RecipeOfTheDay />

    <MealsSection />

    <CuisineSection />

    <Dietary />

    <!-- About section at the end of Home page -->
    <AboutSection />
  </main>
</template>