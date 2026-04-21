<script setup lang="ts">
import { ref, onMounted } from "vue";

// images
import bg from "../assets/background.jpg";
import userImg from "../assets/customer.png";

const feedbacks = ref<any[]>([]);

onMounted(() => {
  const saved = localStorage.getItem("feedbacks");
  if (saved) {
    feedbacks.value = JSON.parse(saved).slice(0, 3);
  }
});
</script>

<template>
  <div
    class="relative bg-cover bg-center py-20 px-6"
    :style="{ backgroundImage: `url(${bg})` }"
  >
    <!-- overlay -->
    <div class="absolute inset-0 bg-black/70"></div>

    <!-- content -->
    <div class="relative z-10 max-w-6xl mx-auto text-white">

      <!-- title -->
      <h2 class="text-4xl font-bold text-center mb-12">
        💬 What Our Customers Say
      </h2>

      <!-- cards -->
      <div class="grid md:grid-cols-3 gap-8">

        <div
          v-for="(fb, index) in feedbacks"
          :key="index"
          class="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-lg hover:scale-105 transition duration-300"
        >

          <!-- user -->
          <div class="flex items-center gap-3 mb-4">
            <img
              :src="fb.avatar || userImg"
              class="w-12 h-12 rounded-full object-cover border-2 border-white"
            />

            <div>
              <p class="font-semibold text-lg">
                {{ fb.name || "Guest User" }}
              </p>
              <p class="text-sm text-gray-300">
                🌍 {{ fb.country || "Sri Lanka" }}
              </p>
            </div>
          </div>

          <!-- rating -->
          <p class="text-yellow-400 text-lg">
            {{ "★".repeat(fb.rating || 5) }}
          </p>

          <!-- comment -->
          <p class="text-gray-200 mt-3 italic">
            "{{ fb.comment }}"
          </p>

        </div>

      </div>
    </div>
  </div>
</template>