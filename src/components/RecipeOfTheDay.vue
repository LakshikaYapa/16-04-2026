<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import type { Recipe, RecipesResponse, StoredDailyRecipe } from "../types";

const router = useRouter();

// state
const recipe = ref<Recipe | null>(null);
const loading = ref(true);
const error = ref("");

// 🔥 Fetch + Daily Logic
onMounted(async () => {
  try {
    const today = new Date().toDateString();

    const savedData = localStorage.getItem("todayRecipe");

  // ✅ if already saved today → use it
  if (savedData) {
    const parsed = JSON.parse(savedData) as StoredDailyRecipe;

    if (parsed.date === today) {
      recipe.value = parsed.data;
      return;
    }
    }

  // ❗ otherwise fetch new recipe
    const res = await fetch("https://dummyjson.com/recipes");
    if (!res.ok) throw new Error("Unable to load the daily recipe.");
    const data = (await res.json()) as RecipesResponse;

    const randomIndex = Math.floor(Math.random() * data.recipes.length);
    const selected = data.recipes[randomIndex];
    if (!selected) throw new Error("No recipe is available.");

    recipe.value = selected;

  // ✅ save for today
    localStorage.setItem("todayRecipe", JSON.stringify({ date: today, data: selected }));
  } catch (caughtError) {
    error.value = caughtError instanceof Error ? caughtError.message : "Something went wrong.";
  } finally {
    loading.value = false;
  }
});

// 🔐 Click handler (login check)
const goToDetails = () => {
  const isAuth = localStorage.getItem("isAuth");

  if (!isAuth) {
    const goLogin = confirm(
      "You need to login first 🔐\n\nPress OK to Login or Cancel to go Home."
    );

    if (goLogin) {
      router.push("/login");
    } else {
      router.push("/");
    }
  } else {
    if (recipe.value) router.push(`/recipe/${recipe.value.id}`);
  }
};
</script>

<template>
  <div v-if="loading" class="bg-black px-5 py-16 text-center text-gray-400">
    Loading recipe of the day...
  </div>
  <div v-else-if="error" class="bg-black px-5 py-16 text-center text-red-400">
    {{ error }}
  </div>
  <div v-if="recipe" class="bg-black px-5 py-10 text-white sm:px-8">

    <!-- Title -->
    <h2 class="mb-6 text-center text-3xl font-bold sm:text-4xl">
      🍽 Recipe of the Day
    </h2>

    <!-- Card -->
    <div 
      class="mx-auto max-w-4xl cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-gray-900 shadow-lg transition hover:-translate-y-1"
      @click="goToDetails"
    >

      <!-- Image -->
      <img 
        :src="recipe.image" 
        alt=""
        class="h-52 w-full object-cover sm:h-72"
      />

      <!-- Content -->
      <div class="p-5 sm:p-6">

        <!-- Name -->
        <h3 class="text-2xl font-semibold mb-2">
          {{ recipe.name }}
        </h3>

        <!-- Description -->
        <p class="text-gray-400 text-sm">
          {{ recipe.instructions?.slice(0, 120) }}...
        </p>

      </div>
    </div>

  </div>
</template>
