<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted, watch } from "vue";
import type { Recipe, RecipesResponse } from "../types";

const route = useRoute();
const router = useRouter();

const recipes = ref<Recipe[]>([]);
const loading = ref(true);
const error = ref("");

// 🔥 fetch function (REUSABLE)
const fetchRecipes = async () => {
  loading.value = true;
  error.value = "";
  try {
    const res = await fetch("https://dummyjson.com/recipes?limit=0");
    if (!res.ok) throw new Error("Could not load recipes.");
    const data = (await res.json()) as RecipesResponse;
    const type = String(route.params.type).toLowerCase();
    recipes.value = data.recipes.filter((recipe) =>
      recipe.mealType.join(" ").toLowerCase().includes(type) ||
      recipe.cuisine.toLowerCase().includes(type) ||
      recipe.tags.join(" ").toLowerCase().includes(type)
    );
  } catch (caughtError) {
    error.value = caughtError instanceof Error ? caughtError.message : "Something went wrong.";
  } finally {
    loading.value = false;
  }
};

// 🔥 first load
onMounted(fetchRecipes);

// 🔥 THIS IS THE IMPORTANT FIX
watch(
  () => route.params.type,
  () => {
    fetchRecipes();
  }
);
</script>

<template>
  <div class="min-h-screen bg-black px-5 py-10 text-white sm:px-8">

    <!-- TITLE -->
    <h1 class="mb-8 text-center text-3xl font-bold capitalize sm:text-4xl">
      {{ $route.params.type }} Recipes
    </h1>

    <!-- LOADING -->
    <p v-if="loading" class="text-center text-gray-400">
      Loading recipes...
    </p>
    <p v-else-if="error" class="text-center text-red-400">{{ error }}</p>

    <!-- RECIPES GRID -->
    <div v-else-if="recipes.length" class="mx-auto grid max-w-7xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

      <div
        v-for="item in recipes"
        :key="item.id"
        @click="router.push(`/recipe/${item.id}`)"
        class="cursor-pointer rounded-xl border border-white/10 bg-gray-900 p-3 transition hover:-translate-y-1"
      >
        <img
          :src="item.image"
          :alt="item.name"
          class="mb-3 h-52 w-full rounded-lg object-cover sm:h-44"
        />

        <h2 class="text-lg font-semibold">
          {{ item.name }}
        </h2>
      </div>

    </div>

    <!-- EMPTY -->
    <p 
      v-if="!loading && recipes.length === 0" 
      class="text-center mt-10 text-gray-400"
    >
      No recipes found 😢
    </p>

  </div>
</template>
   
