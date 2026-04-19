<template>
  <div class="auth-page">
    <div class="auth-card">
      <h2>Welcome Back 👋</h2>
      <p class="subtitle">Login to Kitchen Magic</p>

      <form @submit.prevent="loginUser">
        <input v-model="email" type="email" placeholder="Email" required />
        <input v-model="password" type="password" placeholder="Password" required />

        <button type="submit">Login</button>
      </form>

      <p class="switch">
        Don't have an account?
        <router-link to="/register">Register</router-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    loginUser() {
      const user = JSON.parse(localStorage.getItem("user"));

      if (user && user.email === this.email && user.password === this.password) {
        localStorage.setItem("isAuth", true);
        this.$router.push("/");
      } else {
        alert("Invalid email or password");
      }
    }
  }
};
</script>

<style>
/* ❗ REMOVE scoped (important) */
.auth-page {
  height: 100vh;
  background: linear-gradient(135deg, #1e1e2f, #ff7e5f);
  display: flex;
  justify-content: center;
  align-items: center;
}

.auth-card {
  width: 350px;
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
}

.switch {
  margin-top: 15px;
}
</style>