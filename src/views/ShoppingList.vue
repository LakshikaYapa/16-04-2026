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
  <div class="min-h-screen bg-black text-white p-8">

    <div class="max-w-3xl mx-auto">

      <h1 class="text-4xl font-bold text-center mb-8 text-yellow-400">
        🛒 Shopping List
      </h1>

      <!-- Empty -->
      <div
        v-if="shoppingList.length === 0"
        class="bg-gray-900 rounded-xl p-8 text-center"
      >
        <h2 class="text-2xl mb-3">
          Your shopping list is empty.
        </h2>

        <p class="text-gray-400">
          Open a recipe and add ingredients.
        </p>
      </div>

      <!-- List -->
      <div
        v-else
        class="space-y-3"
      >

        <div
          v-for="(item,index) in shoppingList"
          :key="index"
          class="bg-gray-900 rounded-xl p-4 flex justify-between items-center"
        >

          <div class="flex items-center gap-4">

            <input
              type="checkbox"
              :checked="item.checked"
              @change="toggleItem(index)"
              class="w-5 h-5"
            />

            <span
              :class="item.checked ? 'line-through text-gray-500' : ''"
              class="text-lg"
            >
              {{ item.name }}
            </span>

          </div>

          <button
            @click="removeItem(index)"
            class="bg-red-500 hover:bg-red-600 px-3 py-2 rounded-lg"
          >
            🗑
          </button>

        </div>

        <button
          @click="clearList"
          class="mt-6 w-full bg-orange-500 hover:bg-orange-600 py-3 rounded-lg font-bold"
        >
          Clear Shopping List
        </button>

      </div>

    </div>

  </div>
</template>