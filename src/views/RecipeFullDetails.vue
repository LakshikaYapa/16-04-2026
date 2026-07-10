<script setup lang="ts">
import { useRoute } from "vue-router";
import { ref, onMounted, computed } from "vue";
import { useFavorites } from "../composables/useFavorites";

const route = useRoute();

const recipe = ref<any>(null);

const {
  toggleFavorite,
  isFavorite
} = useFavorites();

// Fetch recipe
onMounted(async () => {

  const res = await fetch(
    `https://dummyjson.com/recipes/${route.params.id}`
  );

  recipe.value = await res.json();

});

// Add ingredients to shopping list
const addToShoppingList = () => {

  if (!recipe.value) return;

  const shoppingList = JSON.parse(
    localStorage.getItem("shoppingList") || "[]"
  );

  recipe.value.ingredients.forEach((ingredient: string) => {

    const exists = shoppingList.find(
      (item: any) =>
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
  <div class="bg-black text-white min-h-screen p-6 flex justify-center">

    <div
      v-if="recipe"
      class="max-w-4xl w-full"
    >

      <!-- IMAGE + FAVORITE -->
      <div class="relative">

        <img
          :src="recipe.image"
          class="w-full h-80 object-cover rounded-xl shadow-lg mb-6"
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
      <h1 class="text-4xl font-bold text-center mb-4">
        {{ recipe.name }}
      </h1>

      <!-- TIME -->
      <div
        class="flex justify-center gap-6 text-gray-400 mb-6"
      >
        <span>⏱ Prep: {{ recipe.prepTimeMinutes }} min</span>

        <span>🔥 Cook: {{ recipe.cookTimeMinutes }} min</span>
      </div>

      <!-- GRID -->
      <div class="grid md:grid-cols-2 gap-6">

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
                {{ index + 1 }}.
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
      v-else
      class="text-gray-400"
    >
      Loading...
    </p>

  </div>
</template>