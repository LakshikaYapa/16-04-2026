<script setup lang="ts">
import { ref } from "vue";

const showForm = ref(false);
const comment = ref("");
const rating = ref(0);

const submitFeedback = () => {
  if (!comment.value || rating.value === 0) return;

  // get logged user
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

  // get old feedbacks
  const existing = JSON.parse(localStorage.getItem("feedbacks") || "[]");

  existing.unshift(newFeedback);

  localStorage.setItem("feedbacks", JSON.stringify(existing));

  // reset
  comment.value = "";
  rating.value = 0;
  showForm.value = false;

  alert("Feedback submitted ✅");
};
</script>

<template>
  <!-- 💬 Button -->
  <button
    @click="showForm = true"
    class="mt-6 bg-orange-500 px-4 py-2 rounded text-white"
  >
    💬 Give Feedback
  </button>

  <!-- 🔥 Popup -->
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
</template>