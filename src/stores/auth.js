// src/stores/auth.js
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import apiClient from '../api'; // We'll need this for the logout call later

export const useAuthStore = defineStore('auth', () => {
  // --- STATE ---
  // Try to load user and token from localStorage on initial load
  const user = ref(JSON.parse(localStorage.getItem('user')) || null);
  const token = ref(localStorage.getItem('token') || null);

  // --- GETTERS ---
  const isAuthenticated = computed(() => !!token.value && !!user.value);

  // --- ACTIONS ---
  /**
   * This is the function that "logs the user in" on the frontend.
   * It stores the user data and token, and also saves them to localStorage
   * to keep the user logged in after a page refresh.
   */
  function setAuthData(userData, authToken) {
    user.value = userData;
    token.value = authToken;
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', authToken);
  }

  /**
   * This function "logs the user out" on the frontend.
   */
  async function clearAuthData() {
    // Optionally, tell the backend to invalidate the token
    if (token.value) {
      try {
        await apiClient.post('/api/logout');
      } catch (error) {
        console.error("Failed to logout from backend", error);
      }
    }

    user.value = null;
    token.value = null;
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }

  return { user, token, isAuthenticated, setAuthData, clearAuthData };
});
