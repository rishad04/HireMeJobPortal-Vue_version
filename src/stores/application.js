// src/stores/application.js
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useApplicationStore = defineStore('application', () => {
  // --- STATE ---
  const isModalOpen = ref(false);
  const jobToApply = ref(null);

  // This is the KEY for redirecting after login.
  // It stores the ID of the job the user *wanted* to apply for.
  const intendedJobId = ref(JSON.parse(sessionStorage.getItem('intendedJobId')) || null);

  // --- ACTIONS ---
  function openApplicationModal(job) {
    jobToApply.value = job;
    isModalOpen.value = true;
  }

  function closeApplicationModal() {
    jobToApply.value = null;
    isModalOpen.value = false;
  }

  // When a logged-out user clicks "Apply", we save their intent.
  function setIntent(jobId) {
    intendedJobId.value = jobId;
    // Use sessionStorage so it's cleared when the browser tab is closed.
    sessionStorage.setItem('intendedJobId', jobId);
  }

  // Once the intent is fulfilled, we clear it.
  function clearIntent() {
    intendedJobId.value = null;
    sessionStorage.removeItem('intendedJobId');
  }

  return {
    isModalOpen,
    jobToApply,
    intendedJobId,
    openApplicationModal,
    closeApplicationModal,
    setIntent,
    clearIntent
  };
});
