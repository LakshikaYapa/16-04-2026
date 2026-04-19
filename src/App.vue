<template>
  <div>
    <!-- ❗ Hide navbar only in login/register -->
    <NavBar v-if="!isAuthPage" />

    <router-view />
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue';

export default {
  components: { NavBar },

  computed: {
    isAuthPage() {
      return this.$route.path === '/login' || this.$route.path === '/register';
    }
  }
};
</script>