<script setup lang="ts">
import { ref, onMounted } from "vue";

const shoppingList = ref<any[]>([]);

const loadShoppingList = () => {
  shoppingList.value = JSON.parse(
    localStorage.getItem("shoppingList") || "[]"
  );
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
  <div class="min-h-screen bg-black text-white py-10 px-5">

    <div class="max-w-4xl mx-auto">

      <h1 class="text-4xl font-bold text-center text-yellow-400 mb-10">
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
          class="bg-[#121826] rounded-xl px-6 py-5 shadow-lg"
        >

          <div class="grid grid-cols-[50px_1fr_80px] items-center gap-5">

            <!-- Checkbox -->
            <input
              type="checkbox"
              :checked="item.checked"
              @change="toggleItem(index)"
              class="w-6 h-6 cursor-pointer accent-orange-500"
            />

            <!-- Ingredient -->
            <span
              class="text-xl break-words"
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