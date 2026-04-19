<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted } from "vue";

const route = useRoute();
const router = useRouter();

const recipes = ref<any[]>([]);
const loading = ref(true);

onMounted(async () => {
  const res = await fetch("https://dummyjson.com/recipes");
  const data = await res.json();

  const type = route.params.type.toString().toLowerCase();

  recipes.value = data.recipes.filter((r: any) => {
    return (
      r.mealType?.join(" ").toLowerCase().includes(type) ||
      r.cuisine?.toLowerCase().includes(type) ||
      r.tags?.join(" ").toLowerCase().includes(type)
    );
  });

  loading.value = false;
});
</script>

<template>
  <div class="bg-black text-white min-h-screen p-6">

    <h1 class="text-3xl font-bold text-center mb-8 capitalize">
      {{ $route.params.type }} Recipes
    </h1>

    <p v-if="loading" class="text-center text-gray-400">
      Loading recipes...
    </p>

    <div v-else class="grid grid-cols-2 md:grid-cols-4 gap-6">

      <!-- 🔥 CLICK FIX HERE -->
      <div
        v-for="item in recipes"
        :key="item.id"
        @click="router.push(`/recipe/${item.id}`)"
        class="cursor-pointer bg-gray-900 p-3 rounded-lg hover:scale-105 transition"
      >
        <img
          :src="item.image"
          class="w-full h-40 object-cover rounded mb-2"
        />

        <h2 class="text-lg font-semibold">
          {{ item.name }}
        </h2>
      </div>

    </div>

    <p v-if="!loading && recipes.length === 0" class="text-center mt-10 text-gray-400">
      No recipes found 😢
    </p>

  </div>
</template>
   