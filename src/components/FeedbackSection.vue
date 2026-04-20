<script setup lang="ts">
import { ref, onMounted } from "vue";

const showPopup = ref(false);
const feedbacks = ref<any[]>([]);
const comment = ref("");
const rating = ref(0);

// load saved feedback
onMounted(() => {
  const saved = localStorage.getItem("feedbacks");
  if (saved) feedbacks.value = JSON.parse(saved);
});

// submit
const submitFeedback = () => {
  if (!comment.value || rating.value === 0) return;

  const newFeedback = {
    comment: comment.value,
    rating: rating.value,
    date: new Date().toLocaleDateString(),
  };

  feedbacks.value.unshift(newFeedback);
  localStorage.setItem("feedbacks", JSON.stringify(feedbacks.value));

  comment.value = "";
  rating.value = 0;
  showPopup.value = false;
};
</script>

<template>
  <!-- 💬 Floating Button -->
  <button
    @click="showPopup = true"
    class="fixed bottom-6 right-6 bg-orange-500 text-white px-5 py-3 rounded-full shadow-lg hover:bg-orange-600 transition z-50"
  >
    💬 Feedback
  </button>

  <!-- 🔥 Popup -->
  <div
    v-if="showPopup"
    class="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
  >
    <div class="bg-gray-900 p-6 rounded-2xl w-full max-w-md text-white">

      <!-- Title -->
      <h2 class="text-xl font-bold mb-4">Customer Feedback</h2>

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

      <!-- Textarea -->
      <textarea
        v-model="comment"
        placeholder="Write your feedback..."
        class="w-full p-3 rounded bg-gray-800 text-white mb-4"
      ></textarea>

      <!-- Buttons -->
      <div class="flex justify-between">
        <button
          @click="showPopup = false"
          class="px-4 py-2 bg-gray-600 rounded"
        >
          Cancel
        </button>

        <button
          @click="submitFeedback"
          class="px-4 py-2 bg-orange-500 rounded"
        >
          Submit
        </button>
      </div>
    </div>
  </div>

  <!-- 🧾 Feedback List -->
  <div class="max-w-3xl mx-auto mt-10 px-4 space-y-4">

    <div
      v-for="(fb, index) in feedbacks"
      :key="index"
      class="bg-gray-900 p-4 rounded-xl text-white"
    >
      <p class="text-yellow-400">
        {{ "★".repeat(fb.rating) }}
      </p>

      <p class="text-gray-300 mt-2">
        {{ fb.comment }}
      </p>

      <p class="text-xs text-gray-500 mt-1">
        {{ fb.date }}
      </p>
    </div>

  </div>
</template>