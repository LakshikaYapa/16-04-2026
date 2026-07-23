<template>
  <div class="min-h-screen bg-black text-white">
    <!-- About Hero -->
    <section class="relative isolate overflow-hidden">
      <img
        :src="aboutBackground"
        alt=""
        class="absolute inset-0 -z-20 h-full w-full object-cover opacity-25"
      />

      <div
        class="absolute inset-0 -z-10 bg-gradient-to-b from-black/50 via-black/80 to-black"
      ></div>

      <div
        class="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24 lg:px-12"
      >
        <p
          class="mb-3 text-center text-sm font-bold uppercase tracking-[0.3em] text-orange-400"
        >
          About Kitchen Magic
        </p>

        <h1
          class="mx-auto max-w-4xl text-center text-4xl font-black leading-tight sm:text-6xl"
        >
          Good food starts with a little inspiration.
        </h1>

        <p
          class="mx-auto mt-6 max-w-3xl text-center text-base leading-7 text-gray-300 sm:text-lg"
        >
          Kitchen Magic is a responsive recipe discovery application made for
          home cooks. It brings recipes, ingredients and step-by-step
          instructions into one simple place.
        </p>
      </div>
    </section>

    <!-- Feature Cards -->
    <section
      class="mx-auto max-w-6xl px-5 pb-20 sm:px-8 lg:px-12"
    >
      <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <article
          v-for="item in highlights"
          :key="item.title"
          class="rounded-2xl border border-white/10 bg-gray-900/80 p-6"
        >
          <div class="mb-4 text-3xl">
            {{ item.icon }}
          </div>

          <h2 class="mb-2 text-xl font-bold">
            {{ item.title }}
          </h2>

          <p class="leading-7 text-gray-400">
            {{ item.description }}
          </p>
        </article>
      </div>

      <!-- Technologies -->
      <div
        class="mt-12 grid items-center gap-8 rounded-3xl border border-orange-500/20 bg-gradient-to-br from-orange-500/15 to-gray-950 p-6 sm:p-10 md:grid-cols-2"
      >
        <div>
          <p class="mb-2 font-semibold text-orange-400">
            Built with modern web technologies
          </p>

          <h2 class="text-3xl font-bold">
            A fast, data-driven Vue SPA
          </h2>

          <p class="mt-4 leading-7 text-gray-300">
            Recipes are loaded asynchronously from DummyJSON. Vue Router
            provides smooth page navigation, while local storage keeps
            favourites and shopping-list items available after a page refresh.
          </p>
        </div>

        <ul
          class="grid grid-cols-2 gap-3 text-center text-sm font-semibold sm:text-base"
        >
          <li
            v-for="tech in technologies"
            :key="tech"
            class="rounded-xl bg-black/50 px-3 py-4"
          >
            {{ tech }}
          </li>
        </ul>
      </div>

      <div class="mt-12 text-center">
        <button
          class="rounded-xl bg-orange-500 px-7 py-3 font-bold text-white transition hover:bg-orange-600"
          @click="$router.push('/')"
        >
          Explore Recipes
        </button>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import aboutBackground from "../assets/about background.jpg";

interface Highlight {
  icon: string;
  title: string;
  description: string;
}

const highlights: Highlight[] = [
  {
    icon: "🌍",
    title: "Explore flavours",
    description:
      "Browse meal types, dietary choices and cuisines from around the world.",
  },
  {
    icon: "❤️",
    title: "Save favourites",
    description:
      "Keep the recipes you love in a persistent personal favourites collection.",
  },
  {
    icon: "🛒",
    title: "Plan with ease",
    description:
      "Add recipe ingredients to a practical shopping list and check them off.",
  },
];

const technologies: string[] = [
  "Vue 3",
  "TypeScript",
  "Tailwind CSS",
  "DummyJSON API",
];
</script>