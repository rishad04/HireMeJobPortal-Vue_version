<template>
  <header>
    <nav class="container">
      <router-link to="/" class="logo">JobPortal</router-link>
      <div class="auth-buttons">
        <!-- If the user IS authenticated, show Dashboard and Logout -->
        <template v-if="authStore.isAuthenticated">
          <router-link to="/dashboard" class="btn btn-secondary">Dashboard</router-link>
          <button @click="handleLogout" class="btn btn-primary ml-3">Logout</button>
        </template>
        <!-- Otherwise (if they are a guest), show Login and Register -->
        <template v-else>
          <router-link to="/login" class="btn btn-secondary">Login</router-link>
          <router-link to="/register" class="btn btn-primary">Register</router-link>
        </template>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { RouterLink, useRouter } from 'vue-router';
import { useToast } from '../composables/useToast';
import { useAuthStore } from '../stores/auth';

const authStore = useAuthStore();
const router = useRouter();
const { showToast } = useToast();

const handleLogout = async () => {
  // Call the Pinia action to clear local state and call the API
  await authStore.clearAuthData();

  showToast('success', 'Logout Successfully!')
  // Redirect to the home page
  router.push('/');
};
</script>

<style scoped>
.ml-3 {
  margin-left: 1rem;
}
</style>
