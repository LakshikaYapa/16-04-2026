<script setup>
import breakfast from '../assets/images/breakfast.webp'
import lunch from '../assets/images/lunch.webp'
import dinner from '../assets/images/dinner.png'
</script>

<template>
  <div class="bg-black min-h-screen text-white p-10">

    <!-- TITLE -->
    <h1 class="text-3xl font-bold text-center mb-10">
      By Meal Type
    </h1>

    <!-- IMAGE SECTION -->
    <div class="flex justify-center gap-12 flex-wrap">

      <!-- BREAKFAST -->
      <div class="text-center">
        <img 
          :src="breakfast"
          class="w-40 h-40 object-cover rounded-full mx-auto 
                 hover:scale-110 transition duration-300 cursor-pointer"
        />
        <p class="mt-3 text-lg">Breakfast</p>
      </div>

      <!-- LUNCH -->
      <div class="text-center">
        <img 
          :src="lunch"
          class="w-40 h-40 object-cover rounded-full mx-auto 
                 hover:scale-110 transition duration-300 cursor-pointer"
        />
        <p class="mt-3 text-lg">Lunch</p>
      </div>

      <!-- DINNER  -->
      <div class="text-center">
        <img 
          :src="dinner"
          class="w-40 h-40 object-cover rounded-full mx-auto 
                 hover:scale-110 transition duration-300 cursor-pointer"
        />
        <p class="mt-3 text-lg">Dinner</p>
      </div>
    </div>

  </div>
</template>