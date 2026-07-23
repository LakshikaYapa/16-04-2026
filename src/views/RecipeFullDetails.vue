<script setup lang="ts">
import {
  computed,
  onMounted,
  ref,
} from "vue";
import { useRoute } from "vue-router";
import { useFavorites } from "../composables/useFavorites";
import type {
  Recipe,
  ShoppingItem,
} from "../types";

const route = useRoute();

const SHOPPING_LIST_UPDATED_EVENT =
  "kitchen-magic-shopping-list-updated";

const recipe = ref<Recipe | null>(null);
const loading = ref(true);
const error = ref("");

const {
  toggleFavorite,
  isFavorite,
} = useFavorites();

/*
  Loads a single recipe from DummyJSON.
*/
const fetchRecipe = async (): Promise<void> => {
  loading.value = true;
  error.value = "";

  try {
    const recipeId = String(route.params.id);

    const response = await fetch(
      `https://dummyjson.com/recipes/${recipeId}`
    );

    if (!response.ok) {
      throw new Error(
        "Could not load this recipe."
      );
    }

    recipe.value =
      (await response.json()) as Recipe;
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
  Safely loads the Shopping List from localStorage.
*/
const readShoppingList = (): ShoppingItem[] => {
  try {
    const storedList =
      localStorage.getItem("shoppingList");

    if (!storedList) {
      return [];
    }

    return JSON.parse(
      storedList
    ) as ShoppingItem[];
  } catch {
    return [];
  }
};

/*
  Adds all ingredients of the selected recipe
  to the Shopping List.

  Duplicate ingredients are not added.
*/
const addToShoppingList = (): void => {
  if (!recipe.value) {
    return;
  }

  const shoppingList = readShoppingList();

  recipe.value.ingredients.forEach(
    (ingredient) => {
      const ingredientAlreadyExists =
        shoppingList.some(
          (item) =>
            item.name.toLowerCase() ===
            ingredient.toLowerCase()
        );

      if (!ingredientAlreadyExists) {
        shoppingList.push({
          name: ingredient,
          checked: false,
        });
      }
    }
  );

  localStorage.setItem(
    "shoppingList",
    JSON.stringify(shoppingList)
  );

  /*
    Informs NavBar that the Shopping List changed.
  */
  window.dispatchEvent(
    new Event(SHOPPING_LIST_UPDATED_EVENT)
  );

  alert(
    "Ingredients added to Shopping List 🛒"
  );
};

/*
  Returns true when the current recipe
  is already in Favorites.
*/
const favorite = computed<boolean>(() => {
  if (!recipe.value) {
    return false;
  }

  return isFavorite(recipe.value.id);
});

/*
  Adds or removes the current recipe
  from Favorites.
*/
const handleFavorite = (): void => {
  if (!recipe.value) {
    return;
  }

  toggleFavorite(recipe.value);
};

onMounted(() => {
  fetchRecipe();
});
</script>

<template>
  <main
    class="flex min-h-screen justify-center bg-black px-5 py-8 text-white sm:px-8"
  >
    <!-- Loading State -->
    <div
      v-if="loading"
      class="flex min-h-[50vh] items-center justify-center"
    >
      <p class="text-gray-400">
        Loading recipe...
      </p>
    </div>

    <!-- Error State -->
    <div
      v-else-if="error"
      class="flex min-h-[50vh] flex-col items-center justify-center gap-5 text-center"
    >
      <p class="text-red-400">
        {{ error }}
      </p>

      <button
        type="button"
        class="rounded-lg bg-yellow-500 px-6 py-2 font-semibold text-black transition hover:bg-yellow-400"
        @click="$router.back()"
      >
        ⬅ Go Back
      </button>
    </div>

    <!-- Recipe Details -->
    <article
      v-else-if="recipe"
      class="w-full max-w-4xl"
    >
      <!-- Recipe Image -->
      <div class="relative">
        <img
          :src="recipe.image"
          :alt="recipe.name"
          class="mb-5 h-56 w-full rounded-xl object-cover shadow-lg sm:h-80"
        />

        <!-- Favorite Button -->
        <div class="mb-4 flex justify-end">
          <button
            type="button"
            class="rounded-full bg-red-500 px-5 py-2 font-semibold text-white transition duration-300 hover:scale-105 hover:bg-red-600"
            :aria-label="
              favorite
                ? `Remove ${recipe.name} from Favorites`
                : `Add ${recipe.name} to Favorites`
            "
            @click="handleFavorite"
          >
            {{
              favorite
                ? "❤️ Remove from Favorites"
                : "🤍 Add to Favorites"
            }}
          </button>
        </div>
      </div>

      <!-- Recipe Name -->
      <h1
        class="mb-4 text-center text-3xl font-bold sm:text-4xl"
      >
        {{ recipe.name }}
      </h1>

      <!-- Recipe Information -->
      <div
        class="mb-7 grid grid-cols-2 gap-3 rounded-xl bg-gray-900 p-4 text-center text-sm text-gray-300 sm:grid-cols-4 sm:text-base"
      >
        <div>
          <span class="block text-lg">
            ⏱
          </span>

          <span class="block text-gray-400">
            Prep Time
          </span>

          <strong>
            {{ recipe.prepTimeMinutes }} min
          </strong>
        </div>

        <div>
          <span class="block text-lg">
            🔥
          </span>

          <span class="block text-gray-400">
            Cook Time
          </span>

          <strong>
            {{ recipe.cookTimeMinutes }} min
          </strong>
        </div>

        <div>
          <span class="block text-lg">
            🍽
          </span>

          <span class="block text-gray-400">
            Servings
          </span>

          <strong>
            {{ recipe.servings }}
          </strong>
        </div>

        <div>
          <span class="block text-lg">
            ⭐
          </span>

          <span class="block text-gray-400">
            Rating
          </span>

          <strong>
            {{ recipe.rating }}
          </strong>
        </div>
      </div>

      <!-- Ingredients and Instructions -->
      <div class="grid gap-6 md:grid-cols-2">
        <!-- Ingredients -->
        <section
          class="rounded-xl bg-gray-900 p-5 shadow"
        >
          <h2
            class="mb-4 text-2xl font-semibold text-yellow-400"
          >
            🥗 Ingredients
          </h2>

          <ul class="space-y-2">
            <li
              v-for="ingredient in recipe.ingredients"
              :key="ingredient"
              class="rounded bg-gray-800 p-2"
            >
              {{ ingredient }}
            </li>
          </ul>

          <button
            type="button"
            class="mt-5 w-full rounded-lg bg-green-600 py-3 font-semibold transition hover:bg-green-700"
            @click="addToShoppingList"
          >
            🛒 Add Ingredients to Shopping List
          </button>
        </section>

        <!-- Instructions -->
        <section
          class="rounded-xl bg-gray-900 p-5 shadow"
        >
          <h2
            class="mb-4 text-2xl font-semibold text-green-400"
          >
            🍳 Instructions
          </h2>

          <ol class="space-y-3">
            <li
              v-for="(
                instruction,
                index
              ) in recipe.instructions"
              :key="`${index}-${instruction}`"
              class="rounded bg-gray-800 p-3"
            >
              <span
                class="mr-2 font-bold text-yellow-400"
              >
                {{ index + 1 }}.
              </span>

              {{ instruction }}
            </li>
          </ol>
        </section>
      </div>

      <!-- Back Button -->
      <div class="mt-8 text-center">
        <button
          type="button"
          class="rounded-lg bg-yellow-500 px-6 py-2 font-semibold text-black transition hover:bg-yellow-400"
          @click="$router.back()"
        >
          ⬅ Back
        </button>
      </div>
    </article>
  </main>
</template>