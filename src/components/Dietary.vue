<script setup lang="ts">
import { useRouter } from "vue-router";
import vegetarianImage from "../assets/meals/dietary/veg.png";
import nonVegetarianImage from "../assets/meals/dietary/non veg.png";

interface DietaryType {
  name: string;
  routeType: string;
  image: string;
  imageAlt: string;
}

const router = useRouter();

const dietaryTypes: DietaryType[] = [
  {
    name: "Vegetarian",
    routeType: "vegetarian",
    image: vegetarianImage,
    imageAlt: "A selection of vegetarian food",
  },
  {
    name: "Non Vegetarian",
    routeType: "non-vegetarian",
    image: nonVegetarianImage,
    imageAlt: "A selection of non-vegetarian food",
  },
];

/*
  Navigates to the recipe list for the selected
  dietary category.
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
        Dietary Types
      </h2>

      <p
        class="mb-10 text-center text-gray-400"
      >
        Choose meals that match your lifestyle.
      </p>

      <div
        class="flex flex-wrap justify-center gap-8 sm:gap-12"
      >
        <button
          v-for="dietaryType in dietaryTypes"
          :key="dietaryType.routeType"
          type="button"
          class="group w-36 text-center sm:w-48"
          @click="
            goToDetails(
              dietaryType.routeType
            )
          "
        >
          <img
            :src="dietaryType.image"
            :alt="dietaryType.imageAlt"
            class="h-36 w-36 rounded-full object-cover transition duration-300 group-hover:scale-105 group-hover:shadow-[0_0_25px_rgba(249,115,22,0.35)] sm:h-48 sm:w-48"
          />

          <span
            class="mt-4 block text-base font-medium transition group-hover:text-orange-400 sm:text-lg"
          >
            {{ dietaryType.name }}
          </span>
        </button>
      </div>
    </div>
  </section>
</template>