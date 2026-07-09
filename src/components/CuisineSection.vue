<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

const cuisines = [
  { name: "Italian", image: "/cuisines/Italian.webp" },
  { name: "Asian", image: "/cuisines/Asian.png" },
  { name: "American", image: "/cuisines/American.webp" },
  { name: "Mexican", image: "/cuisines/Mexican.png" },
];

const goToDetails = (type: string) => {
  router.push(`/recipes/${type.toLowerCase()}`);
};
</script>

<template>
  <section class="bg-black text-white py-16 px-6">

    <div class="max-w-6xl mx-auto">

      <!-- TITLE -->
      <h2 class="text-4xl font-bold text-center mb-4">
        Cuisine Types
      </h2>

      <!-- DESCRIPTION -->
      <p class="text-center text-gray-400 mb-10">
        Explore cuisines from around the world.
      </p>

      <!-- GRID -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">

        <div
          v-for="cuisine in cuisines"
          :key="cuisine.name"
          @click="goToDetails(cuisine.name)"
          class="cursor-pointer group"
        >
          <!-- 🔥 UPDATED IMAGE -->
          <img :src="cuisine.image" class="img-style"/>

          <!-- LABEL -->
          <p class="label">{{ cuisine.name }}</p>
        </div>

      </div>

    </div>
  </section>
</template>

<style scoped>
.img-style {
  width: 100%;
  height: 200px; /* 🔥 increased from 160px */
  object-fit: contain;
  transition: all 0.3s ease;
}

/* 🔥 hover effect */
.img-style:hover {
  transform: scale(1.1);
  filter: drop-shadow(0 0 10px rgba(255, 165, 0, 0.6));
}

/* label */
.label {
  margin-top: 12px;
  font-size: 17px;
  font-weight: 500;
}
</style>