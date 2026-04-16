<template>
  <section class="bg-black text-white p-10">

    

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <RecipeCard v-for="recipe in recipes" :key="recipe.id" :recipe="recipe"/>
    </div>

  </section>
</template>