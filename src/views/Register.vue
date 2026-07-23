<script setup lang="ts">
import { ref } from "vue";
import {
  useRoute,
  useRouter,
} from "vue-router";
import type {
  RegisteredUser,
} from "../types";

const route = useRoute();
const router = useRouter();

const name = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const country = ref("");
const error = ref("");
const submitting = ref(false);

const countries: string[] = [
  "Sri Lanka",
  "India",
  "United States",
  "United Kingdom",
  "Australia",
  "Other",
];

/*
  Safely loads locally registered users.
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
  Returns the internal application page that
  the user originally attempted to open.
*/
const getRedirectPath = (): string | undefined => {
  const redirectPath =
    route.query.redirect;

  if (
    typeof redirectPath === "string" &&
    redirectPath.startsWith("/") &&
    !redirectPath.startsWith("//")
  ) {
    return redirectPath;
  }

  return undefined;
};

/*
  Validates the registration form.
*/
const validateForm = (): boolean => {
  if (name.value.trim().length < 2) {
    error.value =
      "Please enter your full name.";

    return false;
  }

  if (!email.value.trim()) {
    error.value =
      "Please enter your email address.";

    return false;
  }

  if (password.value.length < 6) {
    error.value =
      "Password must contain at least 6 characters.";

    return false;
  }

  if (
    password.value !==
    confirmPassword.value
  ) {
    error.value =
      "Passwords do not match.";

    return false;
  }

  if (!country.value) {
    error.value =
      "Please select your country.";

    return false;
  }

  return true;
};

/*
  Saves a new local account and redirects
  the user to Login.
*/
const registerUser =
  async (): Promise<void> => {
    error.value = "";

    if (!validateForm()) {
      return;
    }

    submitting.value = true;

    try {
      const registeredUsers =
        readRegisteredUsers();

      const normalizedEmail =
        email.value.trim().toLowerCase();

      const accountAlreadyExists =
        registeredUsers.some(
          (user) =>
            user.email.toLowerCase() ===
            normalizedEmail
        );

      if (accountAlreadyExists) {
        error.value =
          "An account already exists with this email.";

        return;
      }

      const newUser: RegisteredUser = {
        name: name.value.trim(),
        email: normalizedEmail,
        password: password.value,
        country: country.value,
      };

      registeredUsers.push(newUser);

      localStorage.setItem(
        "users",
        JSON.stringify(registeredUsers)
      );

      const redirectPath =
        getRedirectPath();

      await router.replace({
        name: "login",

        query: redirectPath
          ? {
              redirect: redirectPath,
            }
          : {},
      });
    } catch {
      error.value =
        "Registration failed. Please try again.";
    } finally {
      submitting.value = false;
    }
  };

/*
  Returns to the public Home page.
*/
const continueAsGuest =
  async (): Promise<void> => {
    await router.push("/");
  };
</script>

<template>
  <main
    class="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-orange-950 px-5 py-10 text-white"
  >
    <section
      class="w-full max-w-md rounded-3xl border border-white/10 bg-white/10 p-7 shadow-2xl backdrop-blur-xl sm:p-9"
    >
      <!-- Heading -->
      <div class="mb-7 text-center">
        <h1
          class="mb-2 text-3xl font-bold"
        >
          Create Account ✨
        </h1>

        <p class="text-sm text-gray-300">
          Create an account to save recipes and
          manage your Shopping List.
        </p>
      </div>

      <!-- Registration Form -->
      <form
        class="space-y-4"
        @submit.prevent="registerUser"
      >
        <!-- Full Name -->
        <div>
          <label
            for="register-name"
            class="mb-2 block text-sm font-medium text-gray-200"
          >
            Full Name
          </label>

          <input
            id="register-name"
            v-model.trim="name"
            type="text"
            autocomplete="name"
            placeholder="Enter your full name"
            required
            class="w-full rounded-xl border border-white/15 bg-black/30 px-4 py-3 text-white outline-none transition placeholder:text-gray-500 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
          />
        </div>

        <!-- Email -->
        <div>
          <label
            for="register-email"
            class="mb-2 block text-sm font-medium text-gray-200"
          >
            Email Address
          </label>

          <input
            id="register-email"
            v-model.trim="email"
            type="email"
            autocomplete="email"
            placeholder="Enter your email address"
            required
            class="w-full rounded-xl border border-white/15 bg-black/30 px-4 py-3 text-white outline-none transition placeholder:text-gray-500 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
          />
        </div>

        <!-- Country -->
        <div>
          <label
            for="register-country"
            class="mb-2 block text-sm font-medium text-gray-200"
          >
            Country
          </label>

          <select
            id="register-country"
            v-model="country"
            required
            class="w-full rounded-xl border border-white/15 bg-gray-900 px-4 py-3 text-white outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
          >
            <option
              disabled
              value=""
            >
              Select your country
            </option>

            <option
              v-for="countryName in countries"
              :key="countryName"
              :value="countryName"
            >
              {{ countryName }}
            </option>
          </select>
        </div>

        <!-- Password -->
        <div>
          <label
            for="register-password"
            class="mb-2 block text-sm font-medium text-gray-200"
          >
            Password
          </label>

          <input
            id="register-password"
            v-model="password"
            type="password"
            autocomplete="new-password"
            placeholder="At least 6 characters"
            minlength="6"
            required
            class="w-full rounded-xl border border-white/15 bg-black/30 px-4 py-3 text-white outline-none transition placeholder:text-gray-500 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
          />
        </div>

        <!-- Confirm Password -->
        <div>
          <label
            for="register-confirm-password"
            class="mb-2 block text-sm font-medium text-gray-200"
          >
            Confirm Password
          </label>

          <input
            id="register-confirm-password"
            v-model="confirmPassword"
            type="password"
            autocomplete="new-password"
            placeholder="Enter your password again"
            minlength="6"
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

        <!-- Register Button -->
        <button
          type="submit"
          :disabled="submitting"
          class="w-full rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white transition hover:bg-orange-600 disabled:cursor-wait disabled:opacity-60"
        >
          {{
            submitting
              ? "Creating account..."
              : "Create Account"
          }}
        </button>
      </form>

      <!-- Login Link -->
      <p
        class="mt-6 text-center text-sm text-gray-300"
      >
        Already have an account?

        <router-link
          :to="{
            name: 'login',
            query:
              typeof route.query.redirect ===
              'string'
                ? {
                    redirect:
                      route.query.redirect,
                  }
                : {},
          }"
          class="font-semibold text-orange-400 transition hover:text-orange-300"
        >
          Login
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