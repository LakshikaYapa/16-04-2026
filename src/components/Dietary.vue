<script setup lang="ts">
import { useRouter } from "vue-router";

import veg from '../assets/meals/dietary/veg.png'
import nonveg from '../assets/meals/dietary/non veg.png'

// 🔥 router
const router = useRouter();

// 🔥 navigate function
const goToDetails = (type: string) => {
  router.push(`/recipes/${type}`);
};
</script>

<template>
  <section class="bg-black text-white py-8 px-6">

    <!-- TITLE -->
    <h2 class="text-center text-4xl font-bold mb-3 font-serif">
      Dietary Types
    </h2>

    <!-- DESCRIPTION -->
    <p class="text-center text-gray-400 max-w-3xl mx-auto mb-8">
      Discover meals that suit your lifestyle and preferences. Whether you prefer
      plant-based dishes or rich, protein-packed options, explore a variety of
      dietary choices crafted to match your taste and health goals.
    </p>

    <!-- IMAGES -->
    <div class="flex justify-center gap-16 flex-wrap">

      <!-- Vegetarian -->
      <div class="text-center cursor-pointer" @click="goToDetails('vegetarian')">
        <img 
          :src="veg"
          class="w-64 h-64 object-cover rounded-full mx-auto 
                 hover:scale-105 transition duration-300"
        />
        <p class="mt-3 text-lg">Vegetarian</p>
      </div>

      <!-- Non-Vegetarian -->
      <div class="text-center cursor-pointer" @click="goToDetails('meat')">
        <img 
          :src="nonveg"
          class="w-64 h-64 object-cover rounded-full mx-auto 
                 hover:scale-105 transition duration-300"
        />
        <p class="mt-3 text-lg">Non Vegetarian</p>
      </div>

    </div>

  </section>
</template>