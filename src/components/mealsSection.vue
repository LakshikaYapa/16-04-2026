<script setup lang="ts">
import { useRouter } from "vue-router";

import breakfast from '../assets/meals/breakfast.webp'
import lunch from '../assets/meals/lunch.webp'
import dinner from '../assets/meals/dinner.png'
import dessert from '../assets/meals/dessert1.webp'

const router = useRouter();

const goToDetails = (type: string) => {
  const isAuth = localStorage.getItem("isAuth");

  if (!isAuth) {
    const goLogin = confirm(
      "You need to login first 🔐\n\nPress OK to Login or Cancel to go Home."
    );

    if (goLogin) {
      router.push("/login");
    } else {
      router.push("/");
    }
  } else {
    router.push(`/recipes/${type}`);
  }
};
</script>

<template>
  <div class="bg-black min-h-screen text-white mb-0">

    <h1 class="text-3xl font-bold text-center mb-20">
      By Meal Type
    </h1>

    <p class="text-center text-gray-400 text-lg max-w-2xl mx-auto mb-10">
      Explore a variety of meals for every time of the day.
    </p>

    <div class="flex justify-center gap-16 flex-wrap">

      <div class="text-center" @click="goToDetails('breakfast')">
        <img :src="breakfast" class="w-full h-55 object-cover rounded-full mx-auto hover:scale-105 transition cursor-pointer"/>
        <p class="mt-3 text-lg">Breakfast</p>
      </div>

      <div class="text-center" @click="goToDetails('lunch')">
        <img :src="lunch" class="w-full h-60 object-cover rounded-full mx-auto hover:scale-105 transition cursor-pointer"/>
        <p class="mt-3 text-lg">Lunch</p>
      </div>

      <div class="text-center" @click="goToDetails('dinner')">
        <img :src="dinner" class="w-full h-60 object-cover rounded-full mx-auto hover:scale-105 transition cursor-pointer"/>
        <p class="mt-3 text-lg">Dinner</p>
      </div>

      <div class="text-center" @click="goToDetails('dessert')">
        <img :src="dessert" class="w-full h-60 object-cover rounded-full mx-auto hover:scale-105 transition cursor-pointer"/>
        <p class="mt-3 text-lg">Dessert</p>
      </div>

    </div>

  </div>
</template>