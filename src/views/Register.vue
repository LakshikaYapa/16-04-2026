<template>
  <div class="auth-page">
    <div class="auth-card">
      <h2>Create Account ✨</h2>
      <p class="subtitle">Join Kitchen Magic today</p>

      <form @submit.prevent="registerUser">
        <input v-model="name" type="text" placeholder="Full Name" required />
        <input v-model="email" type="email" placeholder="Email Address" required />
        <input v-model="password" type="password" placeholder="Password" required />

        <select v-model="country" required>
          <option disabled value="">Select your country</option>
          <option>Sri Lanka</option>
          <option>India</option>
          <option>USA</option>
          <option>UK</option>
          <option>Australia</option>
          <option>Other</option>
        </select>

        <p v-if="error" class="form-error">{{ error }}</p>
        <button type="submit">Register</button>
      </form>

      <p class="switch">
        Already have an account?
        <router-link to="/login">Login</router-link>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import type { RegisteredUser } from "../types";

const router = useRouter();
const name = ref("");
const email = ref("");
const password = ref("");
const country = ref("");
const error = ref("");

const registerUser = (): void => {
  const users = JSON.parse(localStorage.getItem("users") || "[]") as RegisteredUser[];
  if (users.some((user) => user.email.toLowerCase() === email.value.toLowerCase())) {
    error.value = "An account already exists with this email.";
    return;
  }
  if (password.value.length < 6) {
    error.value = "Password must contain at least 6 characters.";
    return;
  }
  users.push({ name: name.value.trim(), email: email.value.trim(), password: password.value, country: country.value });
  localStorage.setItem("users", JSON.stringify(users));
  router.push("/login");
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
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(12px);
  padding: 35px;
  border-radius: 20px;
  width: min(100%, 340px);
  text-align: center;
  color: white;
  box-shadow: 0 8px 30px rgba(0,0,0,0.3);
}

h2 {
  margin-bottom: 5px;
}

.subtitle {
  font-size: 14px;
  margin-bottom: 20px;
  color: #ddd;
}

input, select {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border-radius: 10px;
  border: none;
  outline: none;
}

button {
  width: 100%;
  padding: 12px;
  background: #ff6600;
  border: none;
  border-radius: 10px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
}

button:hover {
  background: #ff4500;
}

.switch {
  margin-top: 15px;
  font-size: 14px;
}
.form-error { margin: 8px 0; color: #fecaca; font-size: 13px; }
</style>
