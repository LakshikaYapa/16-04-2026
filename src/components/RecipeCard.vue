<template>
  <div class="bg-gray-900 rounded-lg p-4 hover:scale-105 transition">

    <img :src="recipe.image" class="w-full h-40 object-cover rounded" />

    <h3 class="mt-2 font-bold">{{ recipe.name }}</h3>

  </div>
</template>

<script setup lang="ts">
defineProps({
  recipe: Object
});
</script>