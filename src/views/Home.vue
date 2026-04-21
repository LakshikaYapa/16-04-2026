<template>
  <div>
  
    <HeroSection/>
     <RecipeOfTheDay />
    <MealsSection />
    <CuisineSection />
    <Dietary />
    <CommentSection />
  </div>
</template>

<script setup lang="ts">
import HeroSection from "../components/HeroSection.vue";
import MealsSection from "../components/mealsSection.vue";
import CuisineSection from "../components/CuisineSection.vue";
import Dietary from "../components/Dietary.vue";
import RecipeOfTheDay from "../components/RecipeOfTheDay.vue";
import NavBar from "../components/NavBar.vue";
import CommentSection from "../components/CommentSection.vue";
</script>