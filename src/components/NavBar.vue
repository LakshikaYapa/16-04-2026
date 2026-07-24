<script setup lang="ts">
import {
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
} from "vue";
import { useRouter } from "vue-router";
import {
  FAVORITES_UPDATED_EVENT,
} from "../composables/useFavorites";
import type {
  Recipe,
  ShoppingItem,
} from "../types";
import SideMenu from "./SideMenu.vue";

const router = useRouter();

const SHOPPING_LIST_UPDATED_EVENT =
  "kitchen-magic-shopping-list-updated";

const isAuth = ref(false);
const showMenu = ref(false);
const showMobileMenu = ref(false);
const shoppingCount = ref(0);
const favoriteCount = ref(0);

const readStoredArray = <T,>(
  key: string
): T[] => {
  try {
    const storedData =
      localStorage.getItem(key);

    if (!storedData) {
      return [];
    }

    return JSON.parse(storedData) as T[];
  } catch {
    return [];
  }
};

const checkAuth = (): void => {
  isAuth.value =
    localStorage.getItem("isAuth") === "true";
};

const loadCounts = (): void => {
  shoppingCount.value =
    readStoredArray<ShoppingItem>(
      "shoppingList"
    ).length;

  favoriteCount.value =
    readStoredArray<Recipe>(
      "favorites"
    ).length;
};

const closeMobileAndGo = async (
  path: string
): Promise<void> => {
  showMobileMenu.value = false;
  await router.push(path);
};

const openCategories = (): void => {
  showMenu.value = true;
  showMobileMenu.value = false;
};

const goToAbout = async (): Promise<void> => {
  showMobileMenu.value = false;

  if (
    router.currentRoute.value.path !== "/"
  ) {
    await router.push("/");
    await nextTick();
  }

  const aboutSection =
    document.getElementById("about");

  aboutSection?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};

const logout = async (): Promise<void> => {
  const authenticationKeys = [
    "isAuth",
    "role",
    "accessToken",
    "userName",
    "userCountry",
  ];

  authenticationKeys.forEach((key) => {
    localStorage.removeItem(key);
  });

  /*
    Favorites and Shopping List data are preserved.
    Their counts are hidden while the user is logged out.
  */
  isAuth.value = false;
  showMobileMenu.value = false;

  await router.push("/");
};

onMounted(() => {
  checkAuth();
  loadCounts();

  window.addEventListener(
    "focus",
    loadCounts
  );

  window.addEventListener(
    "storage",
    loadCounts
  );

  window.addEventListener(
    FAVORITES_UPDATED_EVENT,
    loadCounts
  );

  window.addEventListener(
    SHOPPING_LIST_UPDATED_EVENT,
    loadCounts
  );
});

onBeforeUnmount(() => {
  window.removeEventListener(
    "focus",
    loadCounts
  );

  window.removeEventListener(
    "storage",
    loadCounts
  );

  window.removeEventListener(
    FAVORITES_UPDATED_EVENT,
    loadCounts
  );

  window.removeEventListener(
    SHOPPING_LIST_UPDATED_EVENT,
    loadCounts
  );
});
</script>

<template>
  <nav
    class="sticky top-0 z-40 border-b border-white/10 bg-black/95 text-white shadow-lg backdrop-blur"
  >
    <div
      class="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
    >
      <!-- Logo -->
      <button
        type="button"
        class="flex cursor-pointer items-center gap-2"
        aria-label="Go to Kitchen Magic home page"
        @click="router.push('/')"
      >
        <img
          src="/logo/logo1.jpeg"
          alt="Kitchen Magic logo"
          class="h-16 w-auto rounded-lg object-contain transition hover:scale-105 sm:h-20 lg:h-24"
        />
      </button>

      <!-- Desktop Navigation -->
      <ul
        class="hidden items-center gap-6 text-sm font-medium lg:flex xl:gap-8 xl:text-base"
      >
        <li>
          <button
            type="button"
            class="nav-item"
            @click="router.push('/')"
          >
            Home
          </button>
        </li>

        <li>
          <button
            type="button"
            class="nav-item"
            @click="showMenu = true"
          >
            Categories
          </button>
        </li>

        <li>
          <button
            type="button"
            class="nav-item"
            @click="goToAbout"
          >
            About
          </button>
        </li>

        <li>
          <button
            type="button"
            class="nav-item text-yellow-400"
            @click="
              router.push('/shopping-list')
            "
          >
            🛒 Shopping List

            <span
              v-if="
                isAuth &&
                shoppingCount > 0
              "
              class="ml-1 rounded-full bg-red-500 px-2 py-1 text-xs text-white"
            >
              {{ shoppingCount }}
            </span>
          </button>
        </li>

        <li>
          <button
            type="button"
            class="nav-item text-pink-400"
            @click="
              router.push('/favorites')
            "
          >
            ❤️ Favorites

            <span
              v-if="
                isAuth &&
                favoriteCount > 0
              "
              class="ml-1 rounded-full bg-pink-600 px-2 py-1 text-xs text-white"
            >
              {{ favoriteCount }}
            </span>
          </button>
        </li>

        <li v-if="!isAuth">
          <button
            type="button"
            class="nav-item"
            @click="router.push('/login')"
          >
            Login
          </button>
        </li>

        <li v-if="isAuth">
          <button
            type="button"
            class="nav-item text-red-400 hover:text-red-500"
            @click="logout"
          >
            Logout
          </button>
        </li>
      </ul>

      <!-- Mobile Menu Button -->
      <button
        type="button"
        class="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-2xl transition hover:bg-white/10 lg:hidden"
        :aria-expanded="showMobileMenu"
        :aria-label="
          showMobileMenu
            ? 'Close navigation menu'
            : 'Open navigation menu'
        "
        @click="
          showMobileMenu = !showMobileMenu
        "
      >
        {{ showMobileMenu ? "✕" : "☰" }}
      </button>
    </div>
  </nav>

  <!-- Mobile Navigation -->
  <div
    v-if="showMobileMenu"
    class="fixed inset-x-0 top-20 z-40 max-h-[calc(100svh-5rem)] overflow-y-auto border-b border-white/10 bg-gray-950 px-5 py-5 shadow-2xl lg:hidden"
  >
    <div
      class="mx-auto flex max-w-7xl flex-col gap-2"
    >
      <button
        type="button"
        class="mobile-link"
        @click="closeMobileAndGo('/')"
      >
        Home
      </button>

      <button
        type="button"
        class="mobile-link"
        @click="openCategories"
      >
        Categories
      </button>

      <button
        type="button"
        class="mobile-link"
        @click="goToAbout"
      >
        About
      </button>

      <button
        type="button"
        class="mobile-link text-yellow-300"
        @click="
          closeMobileAndGo('/shopping-list')
        "
      >
        🛒 Shopping List

        <span
          v-if="
            isAuth &&
            shoppingCount > 0
          "
        >
          ({{ shoppingCount }})
        </span>
      </button>

      <button
        type="button"
        class="mobile-link text-pink-300"
        @click="
          closeMobileAndGo('/favorites')
        "
      >
        ❤️ Favorites

        <span
          v-if="
            isAuth &&
            favoriteCount > 0
          "
        >
          ({{ favoriteCount }})
        </span>
      </button>

      <button
        v-if="!isAuth"
        type="button"
        class="mobile-link"
        @click="closeMobileAndGo('/login')"
      >
        Login
      </button>

      <button
        v-if="isAuth"
        type="button"
        class="mobile-link text-red-300"
        @click="logout"
      >
        Logout
      </button>
    </div>
  </div>

  <!-- Category Side Menu -->
  <div
    v-if="showMenu"
    class="fixed inset-0 z-50 flex"
  >
    <SideMenu
      class="animate-slide"
      @close="showMenu = false"
    />

    <button
      type="button"
      class="h-full flex-1 bg-black/60 backdrop-blur-sm"
      aria-label="Close category menu"
      @click="showMenu = false"
    ></button>
  </div>
</template>

<style scoped>
.nav-item {
  position: relative;
  cursor: pointer;
  background: transparent;
  transition: color 0.3s ease;
}

.nav-item:hover {
  color: #facc15;
}

.nav-item::after {
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 2px;
  background: #facc15;
  content: "";
  transition: width 0.3s ease;
}

.nav-item:hover::after {
  width: 100%;
}

.mobile-link {
  width: 100%;
  border-radius: 0.75rem;
  padding: 0.8rem 1rem;
  text-align: left;
  font-weight: 600;
  transition: background 0.2s ease;
}

.mobile-link:hover {
  background: rgba(255, 255, 255, 0.08);
}

@keyframes slideIn {
  from {
    transform: translateX(-100%);
  }

  to {
    transform: translateX(0);
  }
}

.animate-slide {
  animation: slideIn 0.3s ease forwards;
}
</style>