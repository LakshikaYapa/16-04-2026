<script setup lang="ts">
import { useRoute } from "vue-router";
import { ref, onMounted, computed } from "vue";
import { useFavorites } from "../composables/useFavorites";
import type { Recipe, ShoppingItem } from "../types";

const route = useRoute();

const recipe = ref<Recipe | null>(null);
const error = ref("");

const {
  toggleFavorite,
  isFavorite
} = useFavorites();

// Fetch recipe
onMounted(async () => {
  try {
    const res = await fetch(`https://dummyjson.com/recipes/${route.params.id}`);
    if (!res.ok) throw new Error("Could not load this recipe.");
    recipe.value = (await res.json()) as Recipe;
  } catch (caughtError) {
    error.value = caughtError instanceof Error ? caughtError.message : "Something went wrong.";
  }
});

// Add ingredients to shopping list
const addToShoppingList = () => {

  if (!recipe.value) return;

  const shoppingList = JSON.parse(
    localStorage.getItem("shoppingList") || "[]"
  ) as ShoppingItem[];

  recipe.value.ingredients.forEach((ingredient: string) => {

    const exists = shoppingList.find(
      (item) =>
        item.name.toLowerCase() === ingredient.toLowerCase()
    );

    if (!exists) {

      shoppingList.push({
        name: ingredient,
        checked: false,
      });

    }

  });

  localStorage.setItem(
    "shoppingList",
    JSON.stringify(shoppingList)
  );

  alert("Ingredients added to Shopping List 🛒");

};

// Favorite state
const favorite = computed(() => {

  if (!recipe.value) return false;

  return isFavorite(recipe.value.id);

});

// Toggle favorite
const handleFavorite = () => {

  if (!recipe.value) return;

  toggleFavorite(recipe.value);

};
</script>
<template>
  <div class="flex min-h-screen justify-center bg-black px-5 py-8 text-white sm:px-8">

    <div
      v-if="recipe"
      class="max-w-4xl w-full"
    >

      <!-- IMAGE + FAVORITE -->
      <div class="relative">

        <img
          :src="recipe.image"
          :alt="recipe.name"
          class="mb-6 h-56 w-full rounded-xl object-cover shadow-lg sm:h-80"
        />

        <div class="flex justify-end mb-4">

  <button
    @click="handleFavorite"
    class="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-full font-semibold transition duration-300 hover:scale-105"
  >
    {{ favorite ? "❤️ Remove from Favorites" : "🤍 Add to Favorites" }}
  </button>

</div>

      </div>

      <!-- TITLE -->
      <h1 class="mb-4 text-center text-3xl font-bold sm:text-4xl">
        {{ recipe.name }}
      </h1>

      <!-- TIME -->
      <div
        class="mb-6 flex flex-col items-center justify-center gap-2 text-sm text-gray-400 sm:flex-row sm:gap-6 sm:text-base"
      >
        <span>⏱ Prep: {{ recipe.prepTimeMinutes }} min</span>

        <span>🔥 Cook: {{ recipe.cookTimeMinutes }} min</span>
      </div>

      <!-- GRID -->
      <div class="grid gap-6 md:grid-cols-2">

        <!-- Ingredients -->
        <div
          class="bg-gray-900 rounded-xl shadow p-5"
        >

          <h2
            class="text-2xl font-semibold text-yellow-400 mb-4"
          >
            🥗 Ingredients
          </h2>

          <ul class="space-y-2">

            <li
              v-for="(item,index) in recipe.ingredients"
              :key="index"
              class="bg-gray-800 p-2 rounded"
            >
              {{ item }}
            </li>

          </ul>

          <button
            @click="addToShoppingList"
            class="mt-5 w-full bg-green-600 hover:bg-green-700 transition rounded-lg py-3 font-semibold"
          >
            🛒 Add Ingredients to Shopping List
          </button>

        </div>

        <!-- Instructions -->
        <div
          class="bg-gray-900 rounded-xl shadow p-5"
        >

          <h2
            class="text-2xl font-semibold text-green-400 mb-4"
          >
            🍳 Instructions
          </h2>

          <ol class="space-y-3">

            <li
              v-for="(step,index) in recipe.instructions"
              :key="index"
              class="bg-gray-800 rounded p-3"
            >
              <span
                class="text-yellow-400 font-bold mr-2"
              >
                {{ Number(index) + 1 }}.
              </span>

              {{ step }}

            </li>

          </ol>

        </div>

      </div>

      <!-- Back -->
      <div class="text-center mt-8">

        <button
          @click="$router.back()"
          class="bg-yellow-500 text-black px-6 py-2 rounded-lg hover:bg-yellow-400 transition"
        >
          ⬅ Back
        </button>

      </div>

    </div>

    <p
      v-else-if="!error"
      class="text-gray-400"
    >
      Loading...
    </p>
    <p v-else class="text-red-400">{{ error }}</p>

  </div>
</template>
