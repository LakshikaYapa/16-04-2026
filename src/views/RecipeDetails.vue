<script setup lang="ts">
import {
  onMounted,
  ref,
  watch,
} from "vue";
import {
  useRoute,
  useRouter,
} from "vue-router";
import {
  getAllRecipes,
} from "../services/recipeService";
import type {
  Recipe,
} from "../types";

const route = useRoute();
const router = useRouter();

const recipes = ref<Recipe[]>([]);
const loading = ref(true);
const error = ref("");

/*
  Keywords used to identify recipes containing
  meat or seafood.
*/
const nonVegetarianKeywords: string[] = [
  "meat",
  "chicken",
  "beef",
  "pork",
  "lamb",
  "mutton",
  "turkey",
  "bacon",
  "sausage",
  "ham",
  "fish",
  "salmon",
  "tuna",
  "shrimp",
  "prawn",
  "crab",
];

/*
  Checks whether a recipe contains a
  non-vegetarian ingredient.
*/
const isNonVegetarianRecipe = (
  recipe: Recipe
): boolean => {
  const ingredientsText =
    recipe.ingredients
      .join(" ")
      .toLowerCase();

  return nonVegetarianKeywords.some(
    (keyword) =>
      ingredientsText.includes(keyword)
  );
};

/*
  Filters recipes according to the category
  included in the current route.
*/
const filterRecipes = (
  allRecipes: Recipe[],
  category: string
): Recipe[] => {
  /*
    Special filtering for non-vegetarian recipes.
  */
  if (category === "non-vegetarian") {
    return allRecipes.filter(
      isNonVegetarianRecipe
    );
  }

  /*
    Special filtering for vegetarian recipes.
  */
  if (category === "vegetarian") {
    return allRecipes.filter((recipe) =>
      recipe.tags.some(
        (tag) =>
          tag.toLowerCase() ===
          "vegetarian"
      )
    );
  }

  /*
    Standard filtering for meal types,
    cuisines and recipe tags.
  */
  return allRecipes.filter((recipe) => {
    const mealTypes =
      recipe.mealType
        .join(" ")
        .toLowerCase();

    const cuisine =
      recipe.cuisine.toLowerCase();

    const tags =
      recipe.tags
        .join(" ")
        .toLowerCase();

    return (
      mealTypes.includes(category) ||
      cuisine.includes(category) ||
      tags.includes(category)
    );
  });
};

/*
  Loads recipe data through recipeService
  and applies the selected category filter.
*/
const loadRecipes = async (): Promise<void> => {
  loading.value = true;
  error.value = "";

  try {
    const allRecipes =
      await getAllRecipes();

    const selectedCategory =
      String(route.params.type)
        .toLowerCase()
        .trim();

    recipes.value = filterRecipes(
      allRecipes,
      selectedCategory
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
  Opens the selected recipe's full details page.
*/
const openRecipe = async (
  recipeId: number
): Promise<void> => {
  await router.push(
    `/recipe/${recipeId}`
  );
};

/*
  Returns to the Home page.
*/
const returnHome = async (): Promise<void> => {
  await router.push("/");
};

onMounted(() => {
  loadRecipes();
});

/*
  Reloads and filters recipes when the category
  route changes without recreating the component.
*/
watch(
  () => route.params.type,
  () => {
    loadRecipes();
  }
);
</script>

<template>
  <main
    class="min-h-screen bg-black px-5 py-10 text-white sm:px-8"
  >
    <!-- Page Title -->
    <h1
      class="mb-8 text-center text-3xl font-bold capitalize sm:text-4xl"
    >
      {{
        String($route.params.type)
          .replaceAll("-", " ")
      }}
      Recipes
    </h1>

    <!-- Loading State -->
    <section
      v-if="loading"
      class="flex min-h-[40vh] items-center justify-center"
    >
      <p class="text-gray-400">
        Loading recipes...
      </p>
    </section>

    <!-- Error State -->
    <section
      v-else-if="error"
      class="flex min-h-[40vh] flex-col items-center justify-center gap-5 text-center"
    >
      <p class="text-red-400">
        {{ error }}
      </p>

      <button
        type="button"
        class="rounded-lg bg-orange-500 px-6 py-2 font-semibold text-white transition hover:bg-orange-600"
        @click="loadRecipes"
      >
        Try Again
      </button>
    </section>

    <!-- Recipe Grid -->
    <section
      v-else-if="recipes.length > 0"
      class="mx-auto grid max-w-7xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      <button
        v-for="recipe in recipes"
        :key="recipe.id"
        type="button"
        class="overflow-hidden rounded-xl border border-white/10 bg-gray-900 text-left shadow-lg transition duration-300 hover:-translate-y-1 hover:border-orange-500/50 hover:shadow-orange-500/10 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
        :aria-label="`View ${recipe.name} recipe details`"
        @click="openRecipe(recipe.id)"
      >
        <img
          :src="recipe.image"
          :alt="recipe.name"
          class="h-52 w-full object-cover sm:h-44"
        />

        <div class="p-4">
          <h2
            class="mb-2 text-lg font-semibold"
          >
            {{ recipe.name }}
          </h2>

          <div
            class="flex items-center justify-between gap-3 text-sm text-gray-400"
          >
            <span class="truncate">
              {{ recipe.cuisine }}
            </span>

            <span class="flex-none">
              ⭐ {{ recipe.rating }}
            </span>
          </div>

          <div
            class="mt-3 flex items-center justify-between text-xs text-gray-500"
          >
            <span>
              ⏱
              {{
                recipe.prepTimeMinutes +
                recipe.cookTimeMinutes
              }}
              min
            </span>

            <span>
              {{ recipe.difficulty }}
            </span>
          </div>
        </div>
      </button>
    </section>

    <!-- Empty State -->
    <section
      v-else
      class="flex min-h-[40vh] flex-col items-center justify-center text-center"
    >
      <p
        class="mb-5 text-xl text-gray-400"
      >
        No recipes found 😢
      </p>

      <button
        type="button"
        class="rounded-lg bg-yellow-500 px-6 py-2 font-semibold text-black transition hover:bg-yellow-400"
        @click="returnHome"
      >
        Return Home
      </button>
    </section>
  </main>
</template>