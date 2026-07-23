<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { ShoppingItem } from "../types";

const shoppingList = ref<ShoppingItem[]>([]);

const loadShoppingList = () => {
  shoppingList.value = JSON.parse(
    localStorage.getItem("shoppingList") || "[]"
  ) as ShoppingItem[];
};

const saveShoppingList = () => {
  localStorage.setItem(
    "shoppingList",
    JSON.stringify(shoppingList.value)
  );
};

const toggleItem = (index: number) => {
  shoppingList.value[index].checked =
    !shoppingList.value[index].checked;

  saveShoppingList();
};

const removeItem = (index: number) => {
  shoppingList.value.splice(index, 1);

  saveShoppingList();
};

const clearList = () => {
  if (confirm("Clear the entire shopping list?")) {
    shoppingList.value = [];
    saveShoppingList();
  }
};

onMounted(() => {
  loadShoppingList();
});
</script>

<template>
  <div class="min-h-screen bg-black px-4 py-10 text-white sm:px-6">

    <div class="max-w-4xl mx-auto">

      <h1 class="mb-10 text-center text-3xl font-bold text-yellow-400 sm:text-4xl">
        🛒 Shopping List
      </h1>

      <!-- Empty -->
      <div
        v-if="shoppingList.length === 0"
        class="bg-gray-900 rounded-2xl p-10 text-center"
      >
        <h2 class="text-2xl font-semibold mb-3">
          Your shopping list is empty
        </h2>

        <p class="text-gray-400">
          Open a recipe and add ingredients.
        </p>
      </div>

      <!-- List -->
      <div
        v-else
        class="space-y-4"
      >

        <div
          v-for="(item,index) in shoppingList"
          :key="index"
          class="rounded-xl bg-[#121826] px-4 py-4 shadow-lg sm:px-6 sm:py-5"
        >

          <div class="grid grid-cols-[36px_minmax(0,1fr)_48px] items-center gap-3 sm:grid-cols-[50px_minmax(0,1fr)_80px] sm:gap-5">

            <!-- Checkbox -->
            <input
              type="checkbox"
              :checked="item.checked"
              @change="toggleItem(index)"
              class="w-6 h-6 cursor-pointer accent-orange-500"
            />

            <!-- Ingredient -->
            <span
              class="break-words text-base sm:text-xl"
              :class="item.checked ? 'line-through text-gray-500' : 'text-white'"
            >
              {{ item.name }}
            </span>

            <!-- Delete -->
            <button
              @click="removeItem(index)"
              class="h-12 w-12 rounded-lg bg-orange-500 hover:bg-red-600 transition flex items-center justify-center text-xl"
            >
              🗑
            </button>

          </div>

        </div>

        <!-- Clear -->
        <button
          @click="clearList"
          class="mt-8 w-full bg-orange-500 hover:bg-orange-600 transition py-4 rounded-xl text-lg font-bold"
        >
          Clear Shopping List
        </button>

      </div>

    </div>

  </div>
</template>
