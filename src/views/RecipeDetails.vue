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
import type {
  Recipe,
  RecipesResponse,
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
  Filters recipes according to the route category.
*/
const filterRecipes = (
  allRecipes: Recipe[],
  category: string
): Recipe[] => {
  /*
    Special filtering for Non Vegetarian recipes.
  */
  if (category === "non-vegetarian") {
    return allRecipes.filter(
      isNonVegetarianRecipe
    );
  }

  /*
    Filtering for Vegetarian recipes.
    A recipe is treated as vegetarian when its
    tags contain "vegetarian".
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
    Standard filtering for meals, cuisines
    and other tags.
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
  Loads all recipes from DummyJSON and filters
  them using the selected route category.
*/
const fetchRecipes = async (): Promise<void> => {
  loading.value = true;
  error.value = "";

  try {
    const response = await fetch(
      "https://dummyjson.com/recipes?limit=0"
    );

    if (!response.ok) {
      throw new Error(
        "Could not load recipes."
      );
    }

    const data =
      (await response.json()) as RecipesResponse;

    const selectedCategory =
      String(route.params.type)
        .toLowerCase()
        .trim();

    recipes.value = filterRecipes(
      data.recipes,
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
  Opens the full details page for one recipe.
*/
const openRecipe = async (
  recipeId: number
): Promise<void> => {
  await router.push(`/recipe/${recipeId}`);
};

onMounted(() => {
  fetchRecipes();
});

/*
  Reloads recipes when the route category changes,
  such as Breakfast to Dinner.
*/
watch(
  () => route.params.type,
  () => {
    fetchRecipes();
  }
);
</script>

<template>
  <main
    class="min-h-screen bg-black px-5 py-10 text-white sm:px-8"
  >
    <h1
      class="mb-8 text-center text-3xl font-bold capitalize sm:text-4xl"
    >
      {{
        String($route.params.type)
          .replace("-", " ")
      }}
      Recipes
    </h1>

    <!-- Loading State -->
    <div
      v-if="loading"
      class="flex min-h-[40vh] items-center justify-center"
    >
      <p class="text-gray-400">
        Loading recipes...
      </p>
    </div>

    <!-- Error State -->
    <div
      v-else-if="error"
      class="flex min-h-[40vh] flex-col items-center justify-center gap-5 text-center"
    >
      <p class="text-red-400">
        {{ error }}
      </p>

      <button
        type="button"
        class="rounded-lg bg-orange-500 px-6 py-2 font-semibold text-white transition hover:bg-orange-600"
        @click="fetchRecipes"
      >
        Try Again
      </button>
    </div>

    <!-- Recipe Grid -->
    <section
      v-else-if="recipes.length > 0"
      class="mx-auto grid max-w-7xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      <button
        v-for="recipe in recipes"
        :key="recipe.id"
        type="button"
        class="overflow-hidden rounded-xl border border-white/10 bg-gray-900 text-left shadow-lg transition duration-300 hover:-translate-y-1 hover:border-orange-500/50 hover:shadow-orange-500/10"
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
            class="flex items-center justify-between text-sm text-gray-400"
          >
            <span>
              {{ recipe.cuisine }}
            </span>

            <span>
              ⭐ {{ recipe.rating }}
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
      <p class="mb-5 text-xl text-gray-400">
        No recipes found 😢
      </p>

      <button
        type="button"
        class="rounded-lg bg-yellow-500 px-6 py-2 font-semibold text-black transition hover:bg-yellow-400"
        @click="router.push('/')"
      >
        Return Home
      </button>
    </section>
  </main>
</template>