<script setup lang="ts">
import { useRouter } from "vue-router";

import breakfastImage from "../assets/meals/breakfast.webp";
import lunchImage from "../assets/meals/lunch.webp";
import dinnerImage from "../assets/meals/dinner.png";
import dessertImage from "../assets/meals/Dessert1.webp";

interface MealType {
  name: string;
  routeType: string;
  image: string;
  imageAlt: string;
}

const router = useRouter();

/*
  Strictly typed meal category data.
*/
const mealTypes: MealType[] = [
  {
    name: "Breakfast",
    routeType: "breakfast",
    image: breakfastImage,
    imageAlt: "Breakfast recipes",
  },
  {
    name: "Lunch",
    routeType: "lunch",
    image: lunchImage,
    imageAlt: "Lunch recipes",
  },
  {
    name: "Dinner",
    routeType: "dinner",
    image: dinnerImage,
    imageAlt: "Dinner recipes",
  },
  {
    name: "Dessert",
    routeType: "dessert",
    image: dessertImage,
    imageAlt: "Dessert recipes",
  },
];

/*
  Opens the selected meal category.

  Login is not required because every visitor
  should be able to browse recipes.
*/
const goToDetails = async (
  type: string
): Promise<void> => {
  await router.push(`/recipes/${type}`);
};
</script>

<template>
  <section
    class="bg-black px-6 py-16 text-white"
  >
    <div class="mx-auto max-w-6xl">
      <h2
        class="mb-4 text-center text-3xl font-bold sm:text-4xl"
      >
        Meal Types
      </h2>

      <p
        class="mb-10 text-center text-gray-400"
      >
        Explore meals for every time of the day.
      </p>

      <div
        class="grid grid-cols-2 gap-6 text-center md:grid-cols-4 md:gap-8"
      >
        <button
          v-for="meal in mealTypes"
          :key="meal.routeType"
          type="button"
          class="group flex flex-col items-center"
          @click="
            goToDetails(meal.routeType)
          "
        >
          <img
            :src="meal.image"
            :alt="meal.imageAlt"
            class="h-32 w-32 rounded-full object-cover transition duration-300 group-hover:scale-105 group-hover:shadow-[0_0_25px_rgba(249,115,22,0.35)] sm:h-40 sm:w-40 lg:h-48 lg:w-48"
          />

          <span
            class="mt-4 text-base font-medium transition group-hover:text-orange-400 sm:text-lg"
          >
            {{ meal.name }}
          </span>
        </button>
      </div>
    </div>
  </section>
</template>