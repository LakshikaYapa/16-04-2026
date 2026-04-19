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
    router.push(`/recipes/${type.toLowerCase()}`);
  }
};
</script>

<template>
  <section class="bg-black text-white py-0 px-6">

    <h2 class="text-center text-5xl font-bold mb-6 font-serif">
      By Cuisine
    </h2>

    <p class="text-center text-gray-400 text-lg max-w-2xl mx-auto mb-10">
      Explore cuisines from around the world.
    </p>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 items-center">

      <div
        v-for="cuisine in cuisines"
        :key="cuisine.name"
        class="text-center group cursor-pointer"
        @click="goToDetails(cuisine.name)"
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