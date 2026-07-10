<script setup lang="ts">
import { useRouter } from "vue-router";
import { useFavorites } from "../composables/useFavorites";

const router = useRouter();

const {
  favorites,
  removeFavorite
} = useFavorites();
</script>

<template>
  <div class="bg-black min-h-screen text-white p-6">

    <h1 class="text-4xl font-bold text-center mb-8">
      ❤️ My Favorite Recipes
    </h1>

    <!-- Empty -->
    <div
      v-if="favorites.length === 0"
      class="text-center mt-20"
    >
      <h2 class="text-2xl text-gray-400">
        No favorite recipes yet 😔
      </h2>

      <button
        @click="router.push('/')"
        class="mt-6 bg-yellow-500 text-black px-6 py-3 rounded-lg hover:bg-yellow-400 transition"
      >
        Browse Recipes
      </button>
    </div>

    <!-- Favorites -->
    <div
      v-else
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      <div
        v-for="recipe in favorites"
        :key="recipe.id"
        class="bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:scale-105 transition"
      >

        <img
          :src="recipe.image"
          class="w-full h-52 object-cover"
        />

        <div class="p-5">

          <h2 class="text-xl font-bold mb-3">
            {{ recipe.name }}
          </h2>

          <div class="flex justify-between text-gray-400 mb-4">

            <span>
              ⏱ {{ recipe.prepTimeMinutes }} min
            </span>

            <span>
              🔥 {{ recipe.cookTimeMinutes }} min
            </span>

          </div>

          <div class="flex gap-3">

            <button
              @click="router.push(`/recipe/${recipe.id}`)"
              class="flex-1 bg-yellow-500 text-black py-2 rounded-lg hover:bg-yellow-400 transition"
            >
              View
            </button>

            <button
              @click="removeFavorite(recipe.id)"
              class="bg-red-600 px-4 rounded-lg hover:bg-red-700 transition"
            >
              ❤️
            </button>

          </div>

        </div>

      </div>

    </div>

  </div>
</template>