<script setup lang="ts">
import { ref, onMounted } from "vue";

// arrays
const cookedRecipes = ref<string[]>([]);
const futureRecipes = ref<string[]>([]);

// input values
const cookedInput = ref("");
const futureInput = ref("");

// load saved data
onMounted(() => {

  cookedRecipes.value = JSON.parse(
    localStorage.getItem("cookedRecipes") || "[]"
  );

  futureRecipes.value = JSON.parse(
    localStorage.getItem("futureRecipes") || "[]"
  );

});

// add cooked recipe
const addCookedRecipe = () => {

  if (!cookedInput.value.trim()) return;

  cookedRecipes.value.push(cookedInput.value);

  localStorage.setItem(
    "cookedRecipes",
    JSON.stringify(cookedRecipes.value)
  );

  cookedInput.value = "";

};

// add future recipe
const addFutureRecipe = () => {

  if (!futureInput.value.trim()) return;

  futureRecipes.value.push(futureInput.value);

  localStorage.setItem(
    "futureRecipes",
    JSON.stringify(futureRecipes.value)
  );

  futureInput.value = "";

};

// remove cooked
const removeCooked = (index: number) => {

  cookedRecipes.value.splice(index, 1);

  localStorage.setItem(
    "cookedRecipes",
    JSON.stringify(cookedRecipes.value)
  );

};

// remove future
const removeFuture = (index: number) => {

  futureRecipes.value.splice(index, 1);

  localStorage.setItem(
    "futureRecipes",
    JSON.stringify(futureRecipes.value)
  );

};
</script>

<template>

  <div class="bg-black text-white min-h-screen py-10 px-4">

    <h1 class="text-4xl font-bold text-center mb-10">
      My Recipe Journey 🍽️
    </h1>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">

      <!-- COOKED RECIPES -->
      <div class="bg-gray-900 p-6 rounded-2xl shadow-lg">

        <h2 class="text-2xl font-bold mb-5 text-orange-400">
          Recipes I Already Made
        </h2>

        <!-- INPUT -->
        <div class="flex gap-3 mb-5">

          <input
            v-model="cookedInput"
            type="text"
            placeholder="Add cooked recipe..."
            class="flex-1 px-4 py-2 rounded-lg text-black outline-none"
          />

          <button
            @click="addCookedRecipe"
            class="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-lg"
          >
            Add
          </button>

        </div>

        <!-- LIST -->
        <div
          v-for="(recipe, index) in cookedRecipes"
          :key="index"
          class="flex justify-between items-center bg-gray-800 p-3 rounded-lg mb-3"
        >

          <span>{{ recipe }}</span>

          <button
            @click="removeCooked(index)"
            class="text-red-400 hover:text-red-500"
          >
            Remove
          </button>

        </div>

      </div>

      <!-- FUTURE RECIPES -->
      <div class="bg-gray-900 p-6 rounded-2xl shadow-lg">

        <h2 class="text-2xl font-bold mb-5 text-green-400">
          Recipes I Want To Try
        </h2>

        <!-- INPUT -->
        <div class="flex gap-3 mb-5">

          <input
            v-model="futureInput"
            type="text"
            placeholder="Add future recipe..."
            class="flex-1 px-4 py-2 rounded-lg text-black outline-none"
          />

          <button
            @click="addFutureRecipe"
            class="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg"
          >
            Add
          </button>

        </div>

        <!-- LIST -->
        <div
          v-for="(recipe, index) in futureRecipes"
          :key="index"
          class="flex justify-between items-center bg-gray-800 p-3 rounded-lg mb-3"
        >

          <span>{{ recipe }}</span>

          <button
            @click="removeFuture(index)"
            class="text-red-400 hover:text-red-500"
          >
            Remove
          </button>

        </div>

      </div>

    </div>

  </div>

</template>