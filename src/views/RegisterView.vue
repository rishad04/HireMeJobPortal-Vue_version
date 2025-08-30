<template>
  <main class="container">
    <div class="form-container">
      <h2>Create an Account</h2>
      <form @submit.prevent="handleRegister">
        <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>

        <div class="form-group">
          <label for="name">Full Name</label>
          <input type="text" id="name" v-model="form.name" required>
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="form.email" required>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="form.password" required>
        </div>
        <div class="form-group">
          <label for="password_confirmation">Confirm Password</label>
          <input type="password" id="password_confirmation" v-model="form.password_confirmation" required>
        </div>

        <button type="submit" class="btn btn-primary" :disabled="isLoading">
          {{ isLoading ? 'Registering...' : 'Register' }}
        </button>

        <p class="form-switch">Already have an account? <router-link to="/login">Login</router-link></p>
      </form>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import apiClient from '../api';
import { useAuthStore } from '../stores/auth';

// Reactive state for the form data
const form = ref({
  name: '',
  email: '',
  password: '',
  // Note: Your Laravel validator didn't require password_confirmation,
  // so we don't need to send it.
});

const isLoading = ref(false);
const errorMessage = ref('');
const router = useRouter();
const authStore = useAuthStore();

// Method to handle form submission
const handleRegister = async () => {
  isLoading.value = true;
  errorMessage.value = '';

  try {
    // --- THIS IS THE FIX ---
    // Save the result of the API call into a 'response' constant
    const response = await apiClient.post('/api/register', {
      name: form.value.name,
      email: form.value.email,
      password: form.value.password,
    });

    // Now 'response' exists and you can access its data
    const token = response.data.access_token;
    const user = response.data.user;

    // Use the Pinia store to set the auth state
    authStore.setAuthData(user, token);

    // Redirect to the dashboard instead of the login page
    router.push('/dashboard');

  } catch (error) {
    // If there's an error, display it
    if (error.response && error.response.data.errors) {
        // Handle Laravel validation errors
        const errors = error.response.data.errors;
        const firstErrorKey = Object.keys(errors)[0];
        errorMessage.value = errors[firstErrorKey][0];
    } else {
        console.error("Registration failed:", error); // Using console.error is good practice
        errorMessage.value = 'An unexpected error occurred. Please try again.';
    }
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
.error-message {
    background-color: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
    padding: 0.75rem 1.25rem;
    border-radius: 5px;
    margin-bottom: 1rem;
    text-align: center;
}
</style>
