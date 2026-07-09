<script setup lang="ts">
import { useRouter } from "vue-router";

import veg from '../assets/meals/dietary/veg.png'
import nonveg from '../assets/meals/dietary/non veg.png'

const router = useRouter();

const goToDetails = (type: string) => {
  router.push(`/recipes/${type}`);
};
</script>

<template>
  <section class="bg-black text-white py-16 px-6">

    <div class="max-w-6xl mx-auto">

      <h2 class="text-4xl font-bold text-center mb-4">
        Dietary Types
      </h2>

      <p class="text-center text-gray-400 mb-10">
        Choose meals that match your lifestyle.
      </p>

      <!-- 🔥 CENTER FIX HERE -->
      <div class="flex justify-center gap-12 flex-wrap">

        <div @click="goToDetails('vegetarian')" class="cursor-pointer group text-center">
          <img :src="veg" class="img-style"/>
          <p class="label">Vegetarian</p>
        </div>

        <div @click="goToDetails('meat')" class="cursor-pointer group text-center">
          <img :src="nonveg" class="img-style"/>
          <p class="label">Non Vegetarian</p>
        </div>

      </div>

    </div>
  </section>
</template>

<style scoped>
.img-style {
  width: 100%;
  height: 160px;
  object-fit: cover;
  border-radius: 9999px;
  transition: 0.3s;
}
.img-style:hover {
  transform: scale(1.08);
}
.label {
  margin-top: 10px;
  font-size: 16px;
}
</style>