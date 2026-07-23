<template>
  <section class="overflow-hidden bg-black text-white">
    <div
      class="mx-auto grid min-h-[calc(100svh-5rem)] max-w-7xl items-center gap-4 px-5 py-10 sm:px-8 md:grid-cols-2 md:gap-8 lg:px-12"
    >
      <!-- Chef Image -->
      <div class="order-2 flex justify-center md:order-1">
        <img
          src="/chef/chef.png"
          alt="Kitchen Magic chef"
          class="h-auto max-h-[480px] w-full max-w-[530px] object-contain sm:max-h-[820px] md:max-h-[720px]"
        />
      </div>

      <!-- Hero Content -->
      <div class="order-1 flex items-center md:order-2">
        <div class="max-w-2xl text-center md:text-left">
          <p
            class="mb-3 text-sm font-semibold uppercase tracking-[0.28em] text-orange-400"
          >
            Discover. Cook. Enjoy.
          </p>

          <h1
            class="mb-6 text-4xl font-black leading-[0.95] sm:text-6xl lg:text-7xl"
          >
            KITCHEN
            <span class="text-orange-500">MAGIC</span>
          </h1>

          <p
            class="mb-4 text-base leading-7 text-gray-300 sm:text-lg"
          >
            Welcome to Kitchen Magic, your ultimate destination for
            discovering delicious recipes and inspiring culinary creations.
            From quick everyday meals to gourmet delights, we bring together
            flavours from around the world to ignite your passion for cooking.
          </p>

          <p
            class="mb-8 text-sm leading-6 text-gray-400 sm:text-base"
          >
            Whether you are a beginner or an experienced home chef, explore
            diverse cuisines, learn new techniques and transform simple
            ingredients into extraordinary dishes.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>