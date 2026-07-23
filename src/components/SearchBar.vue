<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import type { Recipe, RecipesResponse } from "../types";

const router = useRouter();
const query = ref("");
const recipes = ref<Recipe[]>([]);
const loading = ref(true);
const error = ref("");

const results = computed(() => {
  const term = query.value.trim().toLowerCase();
  if (term.length < 2) return [];
  return recipes.value
    .filter((recipe) =>
      [recipe.name, recipe.cuisine, ...recipe.tags, ...recipe.mealType]
        .join(" ").toLowerCase().includes(term)
    )
    .slice(0, 8);
});

onMounted(async () => {
  try {
    const response = await fetch("https://dummyjson.com/recipes?limit=0");
    if (!response.ok) throw new Error("Search data could not be loaded.");
    const data = (await response.json()) as RecipesResponse;
    recipes.value = data.recipes;
  } catch (caughtError) {
    error.value = caughtError instanceof Error ? caughtError.message : "Search is unavailable.";
  } finally {
    loading.value = false;
  }
});

const openRecipe = (id: number): void => {
  query.value = "";
  router.push(`/recipe/${id}`);
};
</script>

<template>
  <section class="relative z-20 bg-black px-5 py-8 text-white sm:px-8">
    <div class="relative mx-auto max-w-3xl">
      <label for="recipe-search" class="mb-3 block text-center text-2xl font-bold sm:text-3xl">Find your next recipe</label>
      <div class="relative">
        <input id="recipe-search" v-model="query" type="search" autocomplete="off"
          placeholder="Search by recipe, cuisine or tag..."
          class="w-full rounded-2xl border border-white/15 bg-gray-900 px-5 py-4 pr-12 text-white outline-none transition placeholder:text-gray-500 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20" />
        <span class="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xl">🔎</span>
      </div>
      <p v-if="loading" class="mt-3 text-center text-sm text-gray-500">Preparing search...</p>
      <p v-else-if="error" class="mt-3 text-center text-sm text-red-400">{{ error }}</p>
      <div v-else-if="query.trim().length >= 2"
        class="absolute inset-x-0 top-full mt-2 max-h-96 overflow-y-auto rounded-2xl border border-white/10 bg-gray-950 p-2 shadow-2xl">
        <button v-for="recipe in results" :key="recipe.id"
          class="flex w-full items-center gap-4 rounded-xl p-3 text-left transition hover:bg-white/10"
          @click="openRecipe(recipe.id)">
          <img :src="recipe.image" :alt="recipe.name" class="h-14 w-14 rounded-lg object-cover" />
          <span class="min-w-0">
            <strong class="block truncate">{{ recipe.name }}</strong>
            <span class="text-sm text-gray-400">{{ recipe.cuisine }}</span>
          </span>
        </button>
        <p v-if="results.length === 0" class="p-5 text-center text-gray-400">No matching recipes found.</p>
      </div>
    </div>
  </section>
</template>
