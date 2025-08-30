<template>
   <main class="container">
        <div class="form-container">
            <h2>Login to Your Account</h2>
            <form @submit.prevent="handleLogin">
              <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>

                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" v-model="form.email" required>
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" v-model="form.password" required>
                </div>
                <button type="submit" class="btn btn-primary" :disabled="isLoading">{{ isLoading ? 'Login...' : 'Login' }}
        </button>
                <p class="form-switch">>Don't have an account? <router-link to="/register">Register</router-link></p>
            </form>
        </div>
    </main>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import apiClient from '../api';
import { useToast } from '../composables/useToast';
import { useApplicationStore } from '../stores/application';
import { useAuthStore } from '../stores/auth';

const form = ref({
  email: '',
  password: '',
});

const appStore = useApplicationStore();

const isLoading = ref(false);
const errorMessage = ref('');
const router = useRouter();
const authStore = useAuthStore();
const { showToast } = useToast();

const handleLogin = async () => {
  isLoading.value = true;
  errorMessage.value = '';

  try {
    // --- THIS IS THE FIX ---
    // Save the result of the API call into a 'response' constant
    const response = await apiClient.post('/api/login', {
      email: form.value.email,
      password: form.value.password,
    });

    // Now 'response' exists and you can access its data
    const token = response.data.access_token;
    const user = response.data.user;

    // Use the Pinia store to set the auth state
    authStore.setAuthData(user, token);

    showToast('success', response.data.message);

    // Check if the user had a pending job application intent
    if (appStore.intendedJobId) {
        const jobId = appStore.intendedJobId;
        appStore.clearIntent(); // Clear the intent immediately

        // Fetch the specific job data
        const jobResponse = await apiClient.get(`/api/jobs/${jobId}`);

        console.log(jobResponse);

        // Open the modal with the fetched job data
        appStore.openApplicationModal(jobResponse.data);
    }

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
        console.error("Login failed:", error); // Using console.error is good practice
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
