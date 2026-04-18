<script setup lang="ts">
import { useRouter } from "vue-router";

import breakfast from '../assets/meals/breakfast.webp'
import lunch from '../assets/meals/lunch.webp'
import dinner from '../assets/meals/dinner.png'
import dessert from '../assets/meals/dessert1.webp'

// 🔥 router setup
const router = useRouter();

// 🔥 navigate function
const goToDetails = (type: string) => {
  router.push(`/recipes/${type}`);
};
</script>

<template>
  <div class="bg-black min-h-screen text-white mb-0">

    <!-- TITLE -->
    <h1 class="text-3xl font-bold text-center mb-20">
      By Meal Type
    </h1>

    <p class="text-center text-gray-400 text-lg max-w-2xl mx-auto mb-10">
      Explore a variety of meals for every time of the day. From energizing breakfasts 
      to satisfying dinners and delightful desserts, find the perfect recipe for any occasion.
    </p>

    <!-- IMAGE SECTION -->
    <div class="flex justify-center gap-16 flex-wrap">

      <!-- BREAKFAST -->
      <div class="text-center" @click="goToDetails('breakfast')">
        <img 
          :src="breakfast"
          class="w-full h-55 object-cover rounded-full mx-auto 
                 hover:scale-105 transition duration-400 cursor-pointer"
        />
        <p class="mt-3 text-lg">Breakfast</p>
      </div>

      <!-- LUNCH -->
      <div class="text-center" @click="goToDetails('lunch')">
        <img 
          :src="lunch"
          class="w-full h-60 object-cover rounded-full mx-auto 
                 hover:scale-105 transition duration-400 cursor-pointer"
        />
        <p class="mt-3 text-lg">Lunch</p>
      </div>

      <!-- DINNER -->
      <div class="text-center" @click="goToDetails('dinner')">
        <img 
          :src="dinner"
          class="w-full h-60 object-cover rounded-full mx-auto 
                 hover:scale-105 transition duration-300 cursor-pointer"
        />
        <p class="mt-3 text-lg">Dinner</p>
      </div>

      <!-- DESSERT -->
      <div class="text-center" @click="goToDetails('dessert')">
        <img 
          :src="dessert"
          class="w-full h-60 object-cover rounded-full mx-auto 
                 hover:scale-105 transition duration-300 cursor-pointer"
        />
        <p class="mt-3 text-lg">Dessert</p>
      </div>

    </div>

  </div>
</template>