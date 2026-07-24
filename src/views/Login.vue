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

/*
  Safely reads locally registered users.
*/
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

/*
  Gets the page the user originally attempted
  to open before being redirected to Login.
*/
const getRedirectPath = (): string => {
  const redirectPath =
    route.query.redirect;

  /*
    Only allows internal application paths.
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

/*
  Saves authentication information for a
  locally registered user.
*/
const saveLocalUserSession = (
  user: RegisteredUser
): void => {
  localStorage.setItem("isAuth", "true");
  localStorage.setItem(
    "userName",
    user.name
  );
  localStorage.setItem(
    "userCountry",
    user.country
  );
  localStorage.setItem("role", "user");
};

/*
  Saves authentication information returned
  by the DummyJSON login endpoint.
*/
const saveApiUserSession = (
  user: AuthResponse
): void => {
  localStorage.setItem("isAuth", "true");

  localStorage.setItem(
    "accessToken",
    user.accessToken
  );

  localStorage.setItem(
    "userName",
    `${user.firstName} ${user.lastName}`.trim()
  );

  localStorage.setItem("role", "user");
};

/*
  Attempts local authentication first.

  If no matching local account exists, it attempts
  authentication using the DummyJSON API.
*/
const loginUser = async (): Promise<void> => {
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
          user.password === enteredPassword
      );

    /*
      Local account login.
    */
    if (localUser) {
      saveLocalUserSession(localUser);

      await router.replace(
        getRedirectPath()
      );

      return;
    }

    /*
      DummyJSON authentication.
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

    saveApiUserSession(authenticatedUser);

    /*
      Returns the user to the page they originally
      attempted to use.
    */
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
  Returns to the public Home page without logging in.
*/
const continueAsGuest =
  async (): Promise<void> => {
    await router.push("/");
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

      <!-- Guest Option -->
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