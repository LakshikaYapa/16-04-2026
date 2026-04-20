<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

// state
const recipe = ref<any>(null);

// 🔥 Fetch + Daily Logic
onMounted(async () => {
  const today = new Date().toDateString();

  const savedData = localStorage.getItem("todayRecipe");

  // ✅ if already saved today → use it
  if (savedData) {
    const parsed = JSON.parse(savedData);

    if (parsed.date === today) {
      recipe.value = parsed.data;
      return;
    }
  }

  // ❗ otherwise fetch new recipe
  const res = await fetch("https://dummyjson.com/recipes");
  const data = await res.json();

  const randomIndex = Math.floor(Math.random() * data.recipes.length);
  const selected = data.recipes[randomIndex];

  recipe.value = selected;

  // ✅ save for today
  localStorage.setItem(
    "todayRecipe",
    JSON.stringify({
      date: today,
      data: selected,
    })
  );
});

// 🔐 Click handler (login check)
const goToDetails = () => {
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
    router.push(`/recipe/${recipe.value.id}`);
  }
};
</script>

<template>
  <div v-if="recipe" class="bg-black text-white py-10 px-6">

    <!-- Title -->
    <h2 class="text-4xl font-bold text-center mb-6">
      🍽 Recipe of the Day
    </h2>

    <!-- Card -->
    <div 
      class="max-w-4xl mx-auto bg-gray-900 rounded-xl overflow-hidden shadow-lg cursor-pointer hover:scale-105 transition"
      @click="goToDetails"
    >

      <!-- Image -->
      <img 
        :src="recipe.image" 
        class="w-full h-72 object-cover"
      />

      <!-- Content -->
      <div class="p-6">

        <!-- Name -->
        <h3 class="text-2xl font-semibold mb-2">
          {{ recipe.name }}
        </h3>

        <!-- Description -->
        <p class="text-gray-400 text-sm">
          {{ recipe.instructions?.slice(0, 120) }}...
        </p>

      </div>
    </div>

  </div>
</template>