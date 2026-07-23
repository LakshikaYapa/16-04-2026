<template>
  <div class="auth-page">
    <div class="auth-card">
      <h2>Welcome Back 👋</h2>
      <p class="subtitle">Login to Kitchen Magic</p>

      <form @submit.prevent="loginUser">
        <input v-model="email" type="text" placeholder="Email or DummyJSON username" required />
        <input v-model="password" type="password" placeholder="Password" required />

        <p v-if="error" class="form-error">{{ error }}</p>
        <button type="submit" :disabled="loading">{{ loading ? "Logging in..." : "Login" }}</button>
      </form>

      <p class="switch">
        Don't have an account?
        <router-link to="/register">Register</router-link>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import type { AuthResponse, RegisteredUser } from "../types";

const router = useRouter();
const email = ref("");
const password = ref("");
const loading = ref(false);
const error = ref("");

const loginUser = async (): Promise<void> => {
  loading.value = true;
  error.value = "";
  try {
    const users = JSON.parse(localStorage.getItem("users") || "[]") as RegisteredUser[];
    const localUser = users.find((user) => user.email === email.value && user.password === password.value);

    if (localUser) {
      localStorage.setItem("isAuth", "true");
      localStorage.setItem("userName", localUser.name);
      localStorage.setItem("userCountry", localUser.country);
      localStorage.setItem("role", email.value === "admin@gmail.com" ? "admin" : "user");
      router.push("/");
      return;
    }

    const response = await fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: email.value, password: password.value, expiresInMins: 60 }),
    });
    if (!response.ok) throw new Error("Invalid local account or DummyJSON credentials.");
    const user = (await response.json()) as AuthResponse;
    localStorage.setItem("isAuth", "true");
    localStorage.setItem("accessToken", user.accessToken);
    localStorage.setItem("userName", `${user.firstName} ${user.lastName}`.trim());
    localStorage.setItem("role", "user");
    router.push("/");
  } catch (caughtError) {
    error.value = caughtError instanceof Error ? caughtError.message : "Login failed.";
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.auth-page {
  min-height: 100svh;
  padding: 20px;
  background: linear-gradient(135deg, #1e1e2f, #ff7e5f);
  display: flex;
  justify-content: center;
  align-items: center;
}

.auth-card {
  width: min(100%, 350px);
  padding: 35px;
  border-radius: 20px;
  text-align: center;
  background: rgba(255,255,255,0.1);
  backdrop-filter: blur(12px);
  color: white;
}

.subtitle {
  margin-bottom: 20px;
  font-size: 14px;
}

input {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border-radius: 10px;
  border: none;
}

button {
  width: 100%;
  padding: 12px;
  background: #ff6600;
  border: none;
  border-radius: 10px;
  color: white;
  cursor: pointer;
  transition: 0.3s;
}

button:hover {
  background: #ff4500;
}

.switch {
  margin-top: 15px;
}
.form-error { margin: 8px 0; color: #fecaca; font-size: 13px; }
button:disabled { cursor: wait; opacity: .65; }
</style>
