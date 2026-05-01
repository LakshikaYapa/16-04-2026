<script>
export default {
  methods: {
    goTo(type) {
      this.$router.push(`/recipes/${type}`);
      this.$emit("close");
    }
  }
};
</script>

<template>
  <div class="w-64 h-screen bg-gradient-to-b from-gray-900 to-black text-white px-4 py-4 shadow-2xl flex flex-col">

    <!-- 🔥 HEADER -->
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-lg font-bold">🍽 Categories</h2>
      <button @click="$emit('close')" class="text-lg hover:text-red-400">✖</button>
    </div>

    <!-- CONTENT -->
    <div class="flex flex-col gap-3 text-sm">

      <!-- 🍽 Meals -->
      <div>
        <h3 class="text-yellow-400 font-semibold mb-1">Meals</h3>
        <ul class="space-y-1">
          <li @click="goTo('breakfast')" class="menu-item">🍳 Breakfast</li>
          <li @click="goTo('lunch')" class="menu-item">🥪 Lunch</li>
          <li @click="goTo('dinner')" class="menu-item">🍛 Dinner</li>
          <li @click="goTo('dessert')" class="menu-item">🍰 Dessert</li>
        </ul>
      </div>

      <!-- 🌍 Cuisines -->
      <div>
        <h3 class="text-green-400 font-semibold mb-1">Cuisines</h3>
        <ul class="space-y-1">
          <li @click="goTo('italian')" class="menu-item">🍝 Italian</li>
          <li @click="goTo('asian')" class="menu-item">🍜 Asian</li>
          <li @click="goTo('american')" class="menu-item">🍔 American</li>
          <li @click="goTo('mexican')" class="menu-item">🌮 Mexican</li>
        </ul>
      </div>

      <!-- 🥗 Dietary -->
      <div>
        <h3 class="text-pink-400 font-semibold mb-1">Dietary</h3>
        <ul class="space-y-1">
          <li @click="goTo('vegetarian')" class="menu-item">🥗 Vegetarian</li>
          <li @click="goTo('vegan')" class="menu-item">🌱 Vegan</li>
        </ul>
      </div>

    </div>

  </div>
</template>

<style scoped>
.menu-item {
  padding: 6px 8px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 13px;
}

.menu-item:hover {
  background: rgba(255, 165, 0, 0.2);
  transform: translateX(3px);
}
</style>