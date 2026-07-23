<template>
  <div class="min-h-screen bg-black">
    <HeroSection/>
    <SearchBar />
     <RecipeOfTheDay />
    <MealsSection />
    <CuisineSection />
    <Dietary />
    
  </div>
</template>

<script setup lang="ts">
import HeroSection from "../components/HeroSection.vue";
import SearchBar from "../components/SearchBar.vue";
import MealsSection from "../components/mealsSection.vue";
import CuisineSection from "../components/CuisineSection.vue";
import Dietary from "../components/Dietary.vue";
import RecipeOfTheDay from "../components/RecipeOfTheDay.vue";



</script>
