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
    const goLogin = confirm("Login required 🔐");
    if (goLogin) router.push("/login");
    else router.push("/");
  } else {
    router.push(`/recipes/${type}`);
  }
};
</script>

<template>
  <section class="bg-black text-white py-16 px-6">

    <div class="max-w-6xl mx-auto">

      <h2 class="text-4xl font-bold text-center mb-4">
        Meal Types
      </h2>

      <p class="text-center text-gray-400 mb-10">
        Explore meals for every time of the day.
      </p>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">

        <div @click="goToDetails('breakfast')" class="cursor-pointer group">
          <img :src="breakfast" class="img-style"/>
          <p class="label">Breakfast</p>
        </div>

        <div @click="goToDetails('lunch')" class="cursor-pointer group">
          <img :src="lunch" class="img-style"/>
          <p class="label">Lunch</p>
        </div>

        <div @click="goToDetails('dinner')" class="cursor-pointer group">
          <img :src="dinner" class="img-style"/>
          <p class="label">Dinner</p>
        </div>

        <div @click="goToDetails('dessert')" class="cursor-pointer group">
          <img :src="dessert" class="img-style"/>
          <p class="label">Dessert</p>
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