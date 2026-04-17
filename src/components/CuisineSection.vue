<script setup>
const cuisines = [
  { name: "Italian", image: "/cuisines/Italian.webp" },
  { name: "Asian", image: "/cuisines/Asian.png" },
  { name: "American", image: "/cuisines/American.webp" },
  { name: "Mexican", image: "/cuisines/Mexican.png" },
];
</script>

<template>
  <section class="bg-black text-white py-0 px-6">

    <!-- TITLE -->
    <h2 class="text-center text-5xl font-bold mb-6 font-serif">
      By Cuisine
    </h2>

    <!-- DESCRIPTION -->
    <p class="text-center text-gray-400 text-lg max-w-2xl mx-auto mb-10">
  Travel the world through flavors! Explore a diverse collection of cuisines, 
  from rich and spicy dishes to light and comforting meals. Discover new tastes, 
  cultures, and culinary traditions all in one place.
</p>

    <!-- GRID -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 items-center">

      <div
        v-for="cuisine in cuisines"
        :key="cuisine.name"
        class="text-center group"
      >
        <img
          :src="cuisine.image"
          class="mx-auto h-72 object-contain group-hover:scale-110 transition duration-300"
        />

        <p class="mt-4 text-lg">{{ cuisine.name }}</p>
      </div>

    </div>

  </section>
</template>