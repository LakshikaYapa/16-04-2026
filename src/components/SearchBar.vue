<script setup lang="ts">
import {
  computed,
  onMounted,
  ref,
} from "vue";
import { useRouter } from "vue-router";
import {
  getAllRecipes,
} from "../services/recipeService";
import type {
  Recipe,
} from "../types";

const router = useRouter();

const query = ref("");
const recipes = ref<Recipe[]>([]);
const loading = ref(true);
const error = ref("");

/*
  Filters recipes using their name, cuisine,
  meal type and tags.
*/
const searchResults = computed<Recipe[]>(
  () => {
    const searchTerm =
      query.value.trim().toLowerCase();

    if (searchTerm.length < 2) {
      return [];
    }

    return recipes.value
      .filter((recipe) => {
        const searchableText = [
          recipe.name,
          recipe.cuisine,
          ...recipe.tags,
          ...recipe.mealType,
        ]
          .join(" ")
          .toLowerCase();

        return searchableText.includes(
          searchTerm
        );
      })
      .slice(0, 8);
  }
);

/*
  Loads all recipes through recipeService.
*/
const loadRecipes = async (): Promise<void> => {
  loading.value = true;
  error.value = "";

  try {
    recipes.value =
      await getAllRecipes();
  } catch (caughtError) {
    error.value =
      caughtError instanceof Error
        ? caughtError.message
        : "Search is currently unavailable.";
  } finally {
    loading.value = false;
  }
};

/*
  Opens the selected recipe.
*/
const openRecipe = async (
  recipeId: number
): Promise<void> => {
  query.value = "";

  await router.push(
    `/recipe/${recipeId}`
  );
};

/*
  Opens the first matching result when the user
  clicks the Search button or presses Enter.
*/
const submitSearch = async (): Promise<void> => {
  const firstResult =
    searchResults.value[0];

  if (!firstResult) {
    return;
  }

  await openRecipe(firstResult.id);
};

/*
  Clears the search field.
*/
const clearSearch = (): void => {
  query.value = "";
};

onMounted(() => {
  loadRecipes();
});
</script>

<template>
  <section
    class="relative z-20 bg-black px-5 py-8 text-white sm:px-8"
  >
    <div class="relative mx-auto max-w-3xl">
      <label
        for="recipe-search"
        class="mb-3 block text-center text-2xl font-bold sm:text-3xl"
      >
        Find your next recipe
      </label>

      <p
        class="mb-5 text-center text-sm text-gray-400 sm:text-base"
      >
        Search by recipe name, cuisine, meal type
        or tag.
      </p>

      <!-- Search Form -->
      <form
        class="relative"
        role="search"
        @submit.prevent="submitSearch"
      >
        <input
          id="recipe-search"
          v-model="query"
          type="text"
          autocomplete="off"
          placeholder="Search for a recipe..."
          class="w-full rounded-2xl border border-white/15 bg-gray-900 px-5 py-4 pr-24 text-white outline-none transition placeholder:text-gray-500 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
        />

        <!-- Clear Button -->
        <button
          v-if="query"
          type="button"
          class="absolute right-12 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-gray-400 transition hover:bg-white/10 hover:text-white"
          aria-label="Clear recipe search"
          @click="clearSearch"
        >
          ✕
        </button>

        <!-- Search Button -->
        <button
          type="submit"
          class="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-xl text-xl transition hover:bg-orange-500/20 focus:outline-none focus:ring-2 focus:ring-orange-500/40"
          aria-label="Search recipes"
          :disabled="
            loading ||
            searchResults.length === 0
          "
        >
          🔎
        </button>
      </form>

      <!-- Loading State -->
      <p
        v-if="loading"
        class="mt-3 text-center text-sm text-gray-500"
      >
        Preparing search...
      </p>

      <!-- Error State -->
      <div
        v-else-if="error"
        class="mt-3 text-center"
      >
        <p class="mb-3 text-sm text-red-400">
          {{ error }}
        </p>

        <button
          type="button"
          class="rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold transition hover:bg-orange-600"
          @click="loadRecipes"
        >
          Try Again
        </button>
      </div>

      <!-- Minimum Character Message -->
      <p
        v-else-if="
          query.length > 0 &&
          query.trim().length < 2
        "
        class="mt-3 text-center text-sm text-gray-500"
      >
        Enter at least two characters to search.
      </p>

      <!-- Search Results -->
      <div
        v-else-if="
          query.trim().length >= 2
        "
        class="absolute inset-x-0 top-full mt-2 max-h-96 overflow-y-auto rounded-2xl border border-white/10 bg-gray-950 p-2 shadow-2xl"
      >
        <button
          v-for="recipe in searchResults"
          :key="recipe.id"
          type="button"
          class="flex w-full items-center gap-4 rounded-xl p-3 text-left transition hover:bg-white/10 focus:bg-white/10 focus:outline-none"
          @click="openRecipe(recipe.id)"
        >
          <img
            :src="recipe.image"
            :alt="recipe.name"
            class="h-14 w-14 flex-none rounded-lg object-cover"
          />

          <span class="min-w-0 flex-1">
            <strong class="block truncate">
              {{ recipe.name }}
            </strong>

            <span
              class="block truncate text-sm text-gray-400"
            >
              {{ recipe.cuisine }}
              · ⭐ {{ recipe.rating }}
            </span>
          </span>
        </button>

        <p
          v-if="searchResults.length === 0"
          class="p-5 text-center text-gray-400"
        >
          No matching recipes found.
        </p>
      </div>
    </div>
  </section>
</template>