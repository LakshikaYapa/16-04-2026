<script setup lang="ts">
import { ref } from "vue";
import {
  useRoute,
  useRouter,
} from "vue-router";
import type {
  AuthResponse,
  RegisteredUser,
} from "../types";

const route = useRoute();
const router = useRouter();

const loginIdentifier = ref("");
const password = ref("");
const loading = ref(false);
const error = ref("");

const readRegisteredUsers =
  (): RegisteredUser[] => {
    try {
      const storedUsers =
        localStorage.getItem("users");

      if (!storedUsers) {
        return [];
      }

      return JSON.parse(
        storedUsers
      ) as RegisteredUser[];
    } catch {
      return [];
    }
  };

const getRedirectPath = (): string => {
  const redirectPath =
    route.query.redirect;

  /*
    Only internal application paths are allowed.
  */
  if (
    typeof redirectPath === "string" &&
    redirectPath.startsWith("/") &&
    !redirectPath.startsWith("//")
  ) {
    return redirectPath;
  }

  return "/";
};

const saveLocalUserSession = (
  user: RegisteredUser
): void => {
  localStorage.setItem(
    "isAuth",
    "true"
  );

  localStorage.setItem(
    "userName",
    user.name
  );

  localStorage.setItem(
    "userCountry",
    user.country
  );

  localStorage.setItem(
    "role",
    "user"
  );
};

const saveApiUserSession = (
  user: AuthResponse
): void => {
  localStorage.setItem(
    "isAuth",
    "true"
  );

  localStorage.setItem(
    "accessToken",
    user.accessToken
  );

  localStorage.setItem(
    "userName",
    `${user.firstName} ${user.lastName}`.trim()
  );

  localStorage.setItem(
    "role",
    "user"
  );
};

const loginUser =
  async (): Promise<void> => {
    loading.value = true;
    error.value = "";

    try {
      const identifier =
        loginIdentifier.value.trim();

      const enteredPassword =
        password.value;

      const registeredUsers =
        readRegisteredUsers();

      const localUser =
        registeredUsers.find(
          (user) =>
            user.email.toLowerCase() ===
              identifier.toLowerCase() &&
            user.password ===
              enteredPassword
        );

      /*
        Login using a locally registered account.
      */
      if (localUser) {
        saveLocalUserSession(localUser);

        await router.replace(
          getRedirectPath()
        );

        return;
      }

      /*
        Login using the DummyJSON authentication API.
      */
      const response = await fetch(
        "https://dummyjson.com/auth/login",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            username: identifier,
            password: enteredPassword,
            expiresInMins: 60,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          "Invalid email, username or password."
        );
      }

      const authenticatedUser =
        (await response.json()) as AuthResponse;

      saveApiUserSession(
        authenticatedUser
      );

      await router.replace(
        getRedirectPath()
      );
    } catch (caughtError) {
      error.value =
        caughtError instanceof Error
          ? caughtError.message
          : "Login failed. Please try again.";
    } finally {
      loading.value = false;
    }
  };

/*
  Returns the guest to the page that caused
  the Login redirect instead of always going Home.
*/
const continueAsGuest =
  async (): Promise<void> => {
    await router.replace(
      getRedirectPath()
    );
  };
</script>

<template>
  <main
    class="flex min-h-screen items-center justify-center bg-linear-to-br from-gray-950 via-gray-900 to-orange-950 px-5 py-10 text-white"
  >
    <section
      class="w-full max-w-md rounded-3xl border border-white/10 bg-white/10 p-7 shadow-2xl backdrop-blur-xl sm:p-9"
    >
      <!-- Heading -->
      <div class="mb-7 text-center">
        <h1
          class="mb-2 text-3xl font-bold"
        >
          Welcome Back 👋
        </h1>

        <p class="text-sm text-gray-300">
          Login to save favorite recipes and
          create your Shopping List.
        </p>
      </div>

      <!-- Login Form -->
      <form
        class="space-y-5"
        @submit.prevent="loginUser"
      >
        <!-- Email or Username -->
        <div>
          <label
            for="login-identifier"
            class="mb-2 block text-sm font-medium text-gray-200"
          >
            Email or DummyJSON Username
          </label>

          <input
            id="login-identifier"
            v-model.trim="loginIdentifier"
            type="text"
            autocomplete="username"
            placeholder="Enter your email or username"
            required
            class="w-full rounded-xl border border-white/15 bg-black/30 px-4 py-3 text-white outline-none transition placeholder:text-gray-500 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
          />
        </div>

        <!-- Password -->
        <div>
          <label
            for="login-password"
            class="mb-2 block text-sm font-medium text-gray-200"
          >
            Password
          </label>

          <input
            id="login-password"
            v-model="password"
            type="password"
            autocomplete="current-password"
            placeholder="Enter your password"
            required
            class="w-full rounded-xl border border-white/15 bg-black/30 px-4 py-3 text-white outline-none transition placeholder:text-gray-500 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
          />
        </div>

        <!-- Error Message -->
        <p
          v-if="error"
          role="alert"
          class="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-center text-sm text-red-300"
        >
          {{ error }}
        </p>

        <!-- Login Button -->
        <button
          type="submit"
          :disabled="loading"
          class="w-full rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white transition hover:bg-orange-600 disabled:cursor-wait disabled:opacity-60"
        >
          {{
            loading
              ? "Logging in..."
              : "Login"
          }}
        </button>
      </form>

      <!-- Register Link -->
      <p
        class="mt-6 text-center text-sm text-gray-300"
      >
        Don’t have an account?

        <router-link
          :to="{
            name: 'register',
            query: {
              redirect:
                route.query.redirect,
            },
          }"
          class="font-semibold text-orange-400 transition hover:text-orange-300"
        >
          Register
        </router-link>
      </p>

      <!-- Continue as Guest -->
      <button
        type="button"
        class="mt-5 w-full rounded-xl border border-white/15 px-5 py-3 font-medium text-gray-200 transition hover:bg-white/10"
        @click="continueAsGuest"
      >
        Continue browsing without an account
      </button>
    </section>
  </main>
</template>