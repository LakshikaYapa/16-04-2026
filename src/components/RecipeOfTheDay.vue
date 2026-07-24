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
  StoredDailyRecipe,
} from "../types";

const router = useRouter();

const recipe = ref<Recipe | null>(null);
const loading = ref(true);
const error = ref("");

/*
  Returns today's date in a stable format.
*/
const getTodayDate = (): string => {
  return new Date()
    .toISOString()
    .split("T")[0] ?? "";
};

/*
  Safely loads the recipe previously selected
  for the current day.
*/
const readSavedDailyRecipe =
  (): StoredDailyRecipe | null => {
    try {
      const savedRecipe =
        localStorage.getItem("todayRecipe");

      if (!savedRecipe) {
        return null;
      }

      return JSON.parse(
        savedRecipe
      ) as StoredDailyRecipe;
    } catch {
      return null;
    }
  };

/*
  Creates a short description from the
  first preparation instruction.
*/
const recipeDescription =
  computed<string>(() => {
    if (!recipe.value) {
      return "";
    }

    const firstInstruction =
      recipe.value.instructions[0];

    if (!firstInstruction) {
      return "Open this recipe to view its preparation instructions.";
    }

    if (firstInstruction.length <= 130) {
      return firstInstruction;
    }

    return `${firstInstruction.slice(
      0,
      130
    )}...`;
  });

/*
  Uses today's saved recipe when available.

  Otherwise, it retrieves all recipes through
  recipeService and selects a random recipe.
*/
const loadRecipeOfTheDay =
  async (): Promise<void> => {
    loading.value = true;
    error.value = "";

    try {
      const today = getTodayDate();
      const savedRecipe =
        readSavedDailyRecipe();

      if (
        savedRecipe &&
        savedRecipe.date === today &&
        savedRecipe.data
      ) {
        recipe.value = savedRecipe.data;
        return;
      }

      const allRecipes =
        await getAllRecipes();

      if (allRecipes.length === 0) {
        throw new Error(
          "No recipes are currently available."
        );
      }

      const randomIndex = Math.floor(
        Math.random() * allRecipes.length
      );

      const selectedRecipe =
        allRecipes[randomIndex];

      if (!selectedRecipe) {
        throw new Error(
          "Unable to select a daily recipe."
        );
      }

      recipe.value = selectedRecipe;

      const dailyRecipe: StoredDailyRecipe = {
        date: today,
        data: selectedRecipe,
      };

      localStorage.setItem(
        "todayRecipe",
        JSON.stringify(dailyRecipe)
      );
    } catch (caughtError) {
      error.value =
        caughtError instanceof Error
          ? caughtError.message
          : "Something went wrong.";
    } finally {
      loading.value = false;
    }
  };

/*
  Opens the selected recipe without requiring Login.
*/
const goToDetails =
  async (): Promise<void> => {
    if (!recipe.value) {
      return;
    }

    await router.push(
      `/recipe/${recipe.value.id}`
    );
  };

onMounted(() => {
  loadRecipeOfTheDay();
});
</script>

<template>
  <section
    class="bg-black px-5 py-12 text-white sm:px-8"
  >
    <h2
      class="mb-7 text-center text-3xl font-bold sm:text-4xl"
    >
      🍽 Recipe of the Day
    </h2>

    <!-- Loading State -->
    <div
      v-if="loading"
      class="py-16 text-center text-gray-400"
    >
      Loading recipe of the day...
    </div>

    <!-- Error State -->
    <div
      v-else-if="error"
      class="py-12 text-center"
    >
      <p class="mb-5 text-red-400">
        {{ error }}
      </p>

      <button
        type="button"
        class="rounded-lg bg-orange-500 px-6 py-2 font-semibold transition hover:bg-orange-600"
        @click="loadRecipeOfTheDay"
      >
        Try Again
      </button>
    </div>

    <!-- Recipe Card -->
    <button
      v-else-if="recipe"
      type="button"
      class="group mx-auto block w-full max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-gray-900 text-left shadow-lg transition duration-300 hover:-translate-y-1 hover:border-orange-500/50 hover:shadow-orange-500/10 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
      :aria-label="`View ${recipe.name} recipe details`"
      @click="goToDetails"
    >
      <div class="overflow-hidden">
        <img
          :src="recipe.image"
          :alt="recipe.name"
          class="h-52 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
        />
      </div>

      <div class="p-5 sm:p-6">
        <div
          class="mb-3 flex flex-wrap items-center justify-between gap-2"
        >
          <h3
            class="text-2xl font-semibold transition group-hover:text-orange-400"
          >
            {{ recipe.name }}
          </h3>

          <span
            class="rounded-full bg-yellow-500/10 px-3 py-1 text-sm text-yellow-400"
          >
            ⭐ {{ recipe.rating }}
          </span>
        </div>

        <p
          class="mb-4 text-sm leading-6 text-gray-400 sm:text-base"
        >
          {{ recipeDescription }}
        </p>

        <div
          class="flex flex-wrap gap-4 text-sm text-gray-400"
        >
          <span>
            🌍 {{ recipe.cuisine }}
          </span>

          <span>
            ⏱
            {{
              recipe.prepTimeMinutes +
              recipe.cookTimeMinutes
            }}
            min
          </span>

          <span>
            🍽
            {{ recipe.servings }}
            servings
          </span>
        </div>
      </div>
    </button>
  </section>
</template>