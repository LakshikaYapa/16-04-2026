<script setup lang="ts">
import {
  computed,
  onMounted,
  ref,
} from "vue";
import {
  useRoute,
  useRouter,
} from "vue-router";
import {
  useFavorites,
} from "../composables/useFavorites";
import type {
  Recipe,
  ShoppingItem,
} from "../types";

const route = useRoute();
const router = useRouter();

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
  Checks whether the user is currently logged in.
*/
const isAuthenticated = (): boolean => {
  return (
    localStorage.getItem("isAuth") === "true"
  );
};

/*
  Sends an unauthenticated user to Login and
  remembers the current recipe URL.
*/
const redirectToLogin =
  async (): Promise<void> => {
    await router.push({
      name: "login",
      query: {
        redirect: route.fullPath,
      },
    });
  };

/*
  Loads the selected recipe from DummyJSON.
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
  Safely loads Shopping List data.
*/
const readShoppingList =
  (): ShoppingItem[] => {
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
  Adds recipe ingredients to the Shopping List.

  Login is required only when the user attempts
  to save the ingredients.
*/
const addToShoppingList =
  async (): Promise<void> => {
    if (!isAuthenticated()) {
      await redirectToLogin();
      return;
    }

    if (!recipe.value) {
      return;
    }

    const shoppingList = readShoppingList();

    let addedItemCount = 0;

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

          addedItemCount += 1;
        }
      }
    );

    localStorage.setItem(
      "shoppingList",
      JSON.stringify(shoppingList)
    );

    window.dispatchEvent(
      new Event(
        SHOPPING_LIST_UPDATED_EVENT
      )
    );

    if (addedItemCount === 0) {
      alert(
        "These ingredients are already in your Shopping List."
      );

      return;
    }

    alert(
      `${addedItemCount} ingredient${
        addedItemCount === 1 ? "" : "s"
      } added to your Shopping List 🛒`
    );
  };

/*
  Checks whether the current recipe is saved
  as a favorite.
*/
const favorite = computed<boolean>(() => {
  if (
    !recipe.value ||
    !isAuthenticated()
  ) {
    return false;
  }

  return isFavorite(recipe.value.id);
});

/*
  Adds or removes the current recipe from Favorites.

  Login is required only when the user attempts
  to save the recipe.
*/
const handleFavorite =
  async (): Promise<void> => {
    if (!isAuthenticated()) {
      await redirectToLogin();
      return;
    }

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
        class="rounded-lg bg-orange-500 px-6 py-2 font-semibold text-white transition hover:bg-orange-600"
        @click="fetchRecipe"
      >
        Try Again
      </button>

      <button
        type="button"
        class="rounded-lg bg-gray-800 px-6 py-2 font-semibold transition hover:bg-gray-700"
        @click="router.back()"
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

      <!-- Recipe Name -->
      <h1
        class="mb-4 text-center text-3xl font-bold sm:text-4xl"
      >
        {{ recipe.name }}
      </h1>

      <!-- Recipe Information -->
      <section
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
      </section>

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
          @click="router.back()"
        >
          ⬅ Back
        </button>
      </div>
    </article>
  </main>
</template>