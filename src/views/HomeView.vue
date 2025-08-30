<template>
  <main>
    <section class="hero-section">
      <div class="container">
        <template v-if="authStore.isAuthenticated">
          <h1>Welcome back, {{ authStore.user.name }}!</h1>
          <p>Ready to find your next opportunity?</p>
        </template>
        <template v-else>
          <h1>Find Your Dream Job</h1>
          <p>Search from thousands of job openings from top companies.</p>
        </template>
         <form @submit.prevent="handleSearch" class="search-form">
          <!-- Bind the input to our searchQuery ref -->
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Job title, keywords, or company"
          >
          <button type="submit" class="btn btn-primary">Search Jobs</button>
        </form>
      </div>
    </section>

    <section class="jobs-section container">
      <div class="section-header">
        <h2>{{ searchTitle }}</h2>
        <!-- Show a "Clear" button only when a search has been performed -->
        <button v-if="isSearchActive" @click="clearSearch" class="btn btn-secondary">Clear Search</button>
      </div>

      <div v-if="isLoading" class="job-listings">
        <div v-for="n in 8" :key="n" class="job-card job-skeleton-card">
          <div class="skeleton job-skeleton-title"></div>
          <div class="skeleton job-skeleton-text"></div>
          <div class="skeleton job-skeleton-text"></div>
        </div>
      </div>



      <div v-else-if="jobs.length > 0" class="job-listings">
          <div v-for="job in jobs" :key="job.id" class="job-card">
          <div class="job-card-header">
            <h3 class="job-title">{{ job.title }}</h3>
            <span class="job-type full-time">{{ job.type || 'Full Time' }}</span>
          </div>

          <p class="company-name">{{ job.company || 'N/A' }}</p>
          <p class="location">{{ job.location }}</p>

          <div class="job-card-footer">
            <button v-if="authStore.isAuthenticated && job.has_submitted" class="btn" disabled>
              Applied
            </button>
            <button v-else @click="handleApplyClick(job)" class="btn btn-primary">
              Apply Now
            </button>
          </div>
        </div>
      </div>

      <div v-else class="empty-state">
        <p>No featured jobs available at the moment. Please check back later.</p>
      </div>
    </section>
  </main>
</template>

<script setup>

import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import apiClient from '../api';
import { useApplicationStore } from '../stores/application';
import { useAuthStore } from '../stores/auth';
// --- STATE ---
const jobs = ref([]);
const isLoading = ref(true);
const authStore = useAuthStore(); // Get auth store for personalization
const searchQuery = ref(''); // Holds the text from the search input
const activeSearchQuery = ref('');

const appStore = useApplicationStore(); // <-- Get reference to app store
const router = useRouter();

const isSearchActive = computed(() => activeSearchQuery.value !== '');

const searchTitle = computed(() => {
  return isSearchActive.value ? `Search Results for: "${activeSearchQuery.value}"` : 'Featured Jobs';
});

const handleApplyClick = (job) => {
  if (authStore.isAuthenticated) {
    // If user is logged in, open the modal directly.
    appStore.openApplicationModal(job);
  } else {
    // If user is logged out, set their intent and redirect to login.
    appStore.setIntent(job.id);
    router.push({ name: 'login' });
  }
};

// --- METHODS ---
/**
 * Fetches the list of featured jobs from the API.
 */
const fetchJobs = async (query = '') => {

  isLoading.value = true;
  jobs.value = []; // Clear previous results

  // Construct the API URL. If a query exists, add it as a parameter.
  let url = '/api/jobs';
  if (query) {
    url += `?search=${encodeURIComponent(query)}`;
  }

  try {
    const response = await apiClient.get(url);

    // console.log(response);

    if (response.data && response.data) {
      jobs.value = response.data.data;
    }

  } catch (error)
  {
    console.error('Failed to fetch jobs:', error);
    // Optionally, show an error toast
  } finally {
    isLoading.value = false;
  }
};

// --- LIFECYCLE HOOKS ---

/**
 * Handles the search form submission.
 */
const handleSearch = () => {
  activeSearchQuery.value = searchQuery.value;
  fetchJobs(activeSearchQuery.value);
};

/**
 * Clears the search and fetches the default featured jobs.
 */
const clearSearch = () => {
  searchQuery.value = '';
  activeSearchQuery.value = '';
  fetchJobs(); // Fetch all jobs again
};

// Fetch jobs when the component is first mounted (created and added to the page)
onMounted(() => {
  fetchJobs();
});
</script>

<style scoped>
.loading-state, .empty-state {
  text-align: center;
  padding: 3rem;
  color: var(--secondary-text);
}
</style>
