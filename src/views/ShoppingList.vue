<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { ShoppingItem } from "../types";

const SHOPPING_LIST_UPDATED_EVENT =
  "kitchen-magic-shopping-list-updated";

const shoppingList = ref<ShoppingItem[]>([]);

/*
  Safely loads the Shopping List from localStorage.
*/
const loadShoppingList = (): void => {
  try {
    const storedList =
      localStorage.getItem("shoppingList");

    if (!storedList) {
      shoppingList.value = [];
      return;
    }

    shoppingList.value = JSON.parse(
      storedList
    ) as ShoppingItem[];
  } catch {
    shoppingList.value = [];
  }
};

/*
  Saves the Shopping List and informs the NavBar
  that the list has changed.
*/
const saveShoppingList = (): void => {
  localStorage.setItem(
    "shoppingList",
    JSON.stringify(shoppingList.value)
  );

  window.dispatchEvent(
    new Event(SHOPPING_LIST_UPDATED_EVENT)
  );
};

/*
  Marks an ingredient as completed or incomplete.
*/
const toggleItem = (index: number): void => {
  const selectedItem = shoppingList.value[index];

  if (!selectedItem) {
    return;
  }

  selectedItem.checked = !selectedItem.checked;

  saveShoppingList();
};

/*
  Removes one ingredient from the Shopping List.
*/
const removeItem = (index: number): void => {
  if (!shoppingList.value[index]) {
    return;
  }

  shoppingList.value.splice(index, 1);

  saveShoppingList();
};

/*
  Removes every ingredient from the Shopping List.
*/
const clearList = (): void => {
  const shouldClear = confirm(
    "Clear the entire shopping list?"
  );

  if (!shouldClear) {
    return;
  }

  shoppingList.value = [];

  saveShoppingList();
};

onMounted(() => {
  loadShoppingList();
});
</script>

<template>
  <main
    class="min-h-screen bg-black px-4 py-10 text-white sm:px-6"
  >
    <div class="mx-auto max-w-4xl">
      <h1
        class="mb-10 text-center text-3xl font-bold text-yellow-400 sm:text-4xl"
      >
        🛒 Shopping List
      </h1>

      <!-- Empty Shopping List -->
      <section
        v-if="shoppingList.length === 0"
        class="rounded-2xl bg-gray-900 p-10 text-center"
      >
        <h2
          class="mb-3 text-2xl font-semibold"
        >
          Your shopping list is empty
        </h2>

        <p class="text-gray-400">
          Open a recipe and add ingredients.
        </p>

        <router-link
          to="/"
          class="mt-6 inline-block rounded-lg bg-yellow-500 px-6 py-3 font-semibold text-black transition hover:bg-yellow-400"
        >
          Browse Recipes
        </router-link>
      </section>

      <!-- Shopping List Items -->
      <section
        v-else
        class="space-y-4"
      >
        <article
          v-for="(item, index) in shoppingList"
          :key="`${item.name}-${index}`"
          class="rounded-xl bg-[#121826] px-4 py-4 shadow-lg sm:px-6 sm:py-5"
        >
          <div
            class="grid grid-cols-[36px_minmax(0,1fr)_48px] items-center gap-3 sm:grid-cols-[50px_minmax(0,1fr)_80px] sm:gap-5"
          >
            <!-- Checkbox -->
            <input
              type="checkbox"
              :checked="item.checked"
              :aria-label="`Mark ${item.name} as completed`"
              class="h-6 w-6 cursor-pointer accent-orange-500"
              @change="toggleItem(index)"
            />

            <!-- Ingredient Name -->
            <span
              class="break-words text-base sm:text-xl"
              :class="
                item.checked
                  ? 'text-gray-500 line-through'
                  : 'text-white'
              "
            >
              {{ item.name }}
            </span>

            <!-- Delete Button -->
            <button
              type="button"
              :aria-label="`Remove ${item.name} from Shopping List`"
              class="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-500 text-xl transition hover:bg-red-600"
              @click="removeItem(index)"
            >
              🗑
            </button>
          </div>
        </article>

        <!-- Clear Shopping List -->
        <button
          type="button"
          class="mt-8 w-full rounded-xl bg-orange-500 py-4 text-lg font-bold transition hover:bg-orange-600"
          @click="clearList"
        >
          Clear Shopping List
        </button>
      </section>
    </div>
  </main>
</template>