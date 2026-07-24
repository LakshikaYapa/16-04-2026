<script setup lang="ts">
import { useRouter } from "vue-router";

interface MenuItem { icon: string; label: string; type: string }
interface MenuSection { title: string; color: string; items: MenuItem[] }

const emit = defineEmits<{ close: [] }>();
const router = useRouter();

const goTo = (type: string): void => {
  router.push(`/recipes/${type}`);
  emit("close");
};

const sections: MenuSection[] = [
  { title: "Meals", color: "text-yellow-400", items: [
    { icon: "🍳", label: "Breakfast", type: "breakfast" }, { icon: "🥪", label: "Lunch", type: "lunch" },
    { icon: "🍛", label: "Dinner", type: "dinner" }, { icon: "🍰", label: "Dessert", type: "dessert" },
  ]},
  { title: "Cuisines", color: "text-green-400", items: [
    { icon: "🍝", label: "Italian", type: "italian" }, { icon: "🍜", label: "Asian", type: "asian" },
    { icon: "🍔", label: "American", type: "american" }, { icon: "🌮", label: "Mexican", type: "mexican" },
  ]},
  { title: "Dietary", color: "text-pink-400", items: [
    { icon: "🌱", label: "Vegetarian", type: "vegetarian" }, { icon: "🥗", label: "Non Vegetarian", type: "vegan" },
  ]},
];
</script>

<template>
  <aside class="flex h-[100svh] w-[min(82vw,20rem)] flex-col overflow-y-auto bg-gradient-to-b from-gray-900 to-black px-5 py-5 text-white shadow-2xl">
    <div class="mb-5 flex items-center justify-between">
      <h2 class="text-lg font-bold">🍽 Categories</h2>
      <button aria-label="Close categories" class="text-xl hover:text-red-400" @click="emit('close')">✕</button>
    </div>
    <div class="flex flex-col gap-6 text-sm">
      <div v-for="section in sections" :key="section.title">
        <h3 class="mb-2 font-semibold" :class="section.color">{{ section.title }}</h3>
        <ul class="space-y-1">
          <li v-for="item in section.items" :key="item.type" class="menu-item" @click="goTo(item.type)">
            {{ item.icon }} {{ item.label }}
          </li>
        </ul>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.menu-item { cursor: pointer; border-radius: .5rem; padding: .55rem .65rem; transition: .2s ease; }
.menu-item:hover { background: rgba(255,165,0,.2); transform: translateX(3px); }
</style>
