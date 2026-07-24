<script setup lang="ts">
import { useRouter } from "vue-router";

interface CuisineType {
  name: string;
  routeType: string;
  image: string;
  imageAlt: string;
}

const router = useRouter();

const cuisines: CuisineType[] = [
  {
    name: "Italian",
    routeType: "italian",
    image: "/cuisines/Italian.webp",
    imageAlt: "Italian cuisine recipes",
  },
  {
    name: "Asian",
    routeType: "asian",
    image: "/cuisines/Asian.png",
    imageAlt: "Asian cuisine recipes",
  },
  {
    name: "American",
    routeType: "american",
    image: "/cuisines/American.webp",
    imageAlt: "American cuisine recipes",
  },
  {
    name: "Mexican",
    routeType: "mexican",
    image: "/cuisines/Mexican.png",
    imageAlt: "Mexican cuisine recipes",
  },
];

/*
  Opens the selected cuisine category.
*/
const goToDetails = async (
  cuisineType: string
): Promise<void> => {
  await router.push(
    `/recipes/${cuisineType}`
  );
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
        Cuisine Types
      </h2>

      <p
        class="mb-10 text-center text-gray-400"
      >
        Explore cuisines from around the world.
      </p>

      <div
        class="grid grid-cols-2 gap-6 text-center md:grid-cols-4 md:gap-8"
      >
        <button
          v-for="cuisine in cuisines"
          :key="cuisine.routeType"
          type="button"
          class="group flex flex-col items-center rounded-2xl p-3 transition hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-orange-500/40"
          :aria-label="`Browse ${cuisine.name} recipes`"
          @click="
            goToDetails(
              cuisine.routeType
            )
          "
        >
          <img
            :src="cuisine.image"
            :alt="cuisine.imageAlt"
            class="h-32 w-full object-contain transition duration-300 group-hover:scale-105 group-hover:drop-shadow-[0_0_12px_rgba(249,115,22,0.5)] sm:h-40 lg:h-48"
          />

          <span
            class="mt-4 text-base font-medium transition group-hover:text-orange-400 sm:text-lg"
          >
            {{ cuisine.name }}
          </span>
        </button>
      </div>
    </div>
  </section>
</template>