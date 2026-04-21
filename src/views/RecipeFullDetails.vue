<script setup lang="ts">
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";

const route = useRoute();
const recipe = ref<any>(null);

// 🔥 Feedback state
const showForm = ref(false);
const comment = ref("");
const rating = ref(0);

// fetch recipe
onMounted(async () => {
  const res = await fetch(`https://dummyjson.com/recipes/${route.params.id}`);
  recipe.value = await res.json();
});

// submit feedback
const submitFeedback = () => {
  if (!comment.value || rating.value === 0) return;

  const name = localStorage.getItem("userName");
  const country = localStorage.getItem("userCountry");

  const newFeedback = {
    name: name || "Guest User",
    country: country || "Sri Lanka",
    comment: comment.value,
    rating: rating.value,
    date: new Date().toLocaleDateString(),
    avatar: `https://i.pravatar.cc/150?u=${Date.now()}`
  };

  const existing = JSON.parse(localStorage.getItem("feedbacks") || "[]");
  existing.unshift(newFeedback);

  localStorage.setItem("feedbacks", JSON.stringify(existing));

  comment.value = "";
  rating.value = 0;
  showForm.value = false;

  alert("Feedback submitted ✅");
};
</script>

<template>
  <div class="bg-black text-white min-h-screen p-6 flex justify-center">

    <div v-if="recipe" class="max-w-4xl w-full">

      <!-- IMAGE -->
      <img
        :src="recipe.image"
        class="w-full h-80 object-cover rounded-xl shadow-lg mb-6"
      />

      <!-- TITLE -->
      <h1 class="text-4xl font-bold mb-4 text-center">
        {{ recipe.name }}
      </h1>

      <!-- TIME INFO -->
      <div class="flex justify-center gap-6 mb-6 text-gray-400">
        <span>⏱ Prep: {{ recipe.prepTimeMinutes }} min</span>
        <span>🔥 Cook: {{ recipe.cookTimeMinutes }} min</span>
      </div>

      <!-- GRID -->
      <div class="grid md:grid-cols-2 gap-6">

        <!-- INGREDIENTS -->
        <div class="bg-gray-900 p-5 rounded-xl shadow">
          <h2 class="text-2xl font-semibold mb-4 text-yellow-400">
            🥗 Ingredients
          </h2>

          <ul class="space-y-2">
            <li
              v-for="(item, i) in recipe.ingredients"
              :key="i"
              class="bg-gray-800 p-2 rounded"
            >
              {{ item }}
            </li>
          </ul>
        </div>

        <!-- INSTRUCTIONS -->
        <div class="bg-gray-900 p-5 rounded-xl shadow">
          <h2 class="text-2xl font-semibold mb-4 text-green-400">
            🍳 Instructions
          </h2>

          <ol class="space-y-3">
            <li
              v-for="(step, i) in recipe.instructions"
              :key="i"
              class="bg-gray-800 p-3 rounded"
            >
              <span class="font-bold text-yellow-400 mr-2">
                {{ i + 1 }}.
              </span>
              {{ step }}
            </li>
          </ol>
        </div>

      </div>

      <!-- 💬 FEEDBACK BUTTON -->
      <div class="text-center mt-8">
        <button
          @click="showForm = true"
          class="bg-orange-500 px-6 py-2 rounded-lg hover:bg-orange-600 transition"
        >
          💬 Give Feedback
        </button>
      </div>

      <!-- 🔥 POPUP -->
      <div
        v-if="showForm"
        class="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
      >
        <div class="bg-gray-900 p-6 rounded-xl w-full max-w-md text-white">

          <h2 class="text-xl font-bold mb-4">Your Feedback</h2>

          <!-- ⭐ Stars -->
          <div class="flex gap-2 mb-4">
            <span
              v-for="i in 5"
              :key="i"
              @click="rating = i"
              class="text-3xl cursor-pointer"
              :class="i <= rating ? 'text-yellow-400' : 'text-gray-500'"
            >
              ★
            </span>
          </div>

          <!-- Comment -->
          <textarea
            v-model="comment"
            placeholder="Write your feedback..."
            class="w-full p-3 rounded bg-gray-800 mb-4"
          ></textarea>

          <!-- Buttons -->
          <div class="flex justify-between">
            <button
              @click="showForm = false"
              class="bg-gray-600 px-4 py-2 rounded"
            >
              Cancel
            </button>

            <button
              @click="submitFeedback"
              class="bg-orange-500 px-4 py-2 rounded"
            >
              Submit
            </button>
          </div>

        </div>
      </div>

      <!-- BACK BUTTON -->
      <div class="text-center mt-8">
        <button
          @click="$router.back()"
          class="bg-yellow-500 text-black px-6 py-2 rounded-lg hover:bg-yellow-400 transition"
        >
          ⬅ Back
        </button>
      </div>

    </div>

    <!-- LOADING -->
    <p v-else class="text-gray-400">Loading...</p>

  </div>
</template>