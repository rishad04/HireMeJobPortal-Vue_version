<template>
  <!-- The modal wrapper with a semi-transparent background -->
  <div v-if="appStore.isModalOpen" class="modal-overlay" @click.self="closeModal">
    <!-- The modal content card -->
    <div class="modal-content">
      <button @click="closeModal" class="close-button">&times;</button>

      <div v-if="appStore.jobToApply">
        <h2>Apply for Job</h2>
        <div class="job-details">
          <h3>{{ appStore.jobToApply.title }}</h3>
          <p class="company-name">{{ appStore.jobToApply.company?.name }}</p>
          <p class="location">{{ appStore.jobToApply.location }}</p>
        </div>

        <div class="payment-details">
          <h4>Payment Required</h4>
          <p class="amount">100 tk</p>
          <p class="instruction">Please select a payment method to proceed.</p>

          <div class="payment-methods">
            <!-- <div
              class="payment-option"
              :class="{ selected: selectedPayment === 'sslcommerz' }"
              @click="selectedPayment = 'sslcommerz'"
            >
              <img src="/images/sslcommerz.png" alt="SSLCommerz">
            </div> -->
            <div
              class="payment-option"
              :class="{ selected: selectedPayment === 'stripe' }"
              @click="selectedPayment = 'stripe'"
            >
              <img src="/images/stripe.png" alt="Stripe">
            </div>
          </div>
        </div>

        <div class="modal-actions">
          <button
            @click="handleConfirmApplication"
            class="btn btn-primary"
            :disabled="isProcessing"
            :class="{ 'is-loading': isProcessing }"
          >
            <span v-if="isProcessing" class="spinner"></span>

            <span>
              {{ isProcessing ? 'Processing...' : 'Confirm Application & Pay' }}
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import apiClient from '../api';
import { useToast } from '../composables/useToast';
import { useApplicationStore } from '../stores/application';

// --- STORE & COMPOSABLE HOOKS ---
// Get a reference to the application store to control the modal
const appStore = useApplicationStore();
// Get the reusable toast notification function
const { showToast } = useToast();

// --- LOCAL COMPONENT STATE ---
// Holds the currently selected payment method ('sslcommerz' or 'stripe')
const selectedPayment = ref('sslcommerz');
// Tracks the loading state for the submission button to prevent double-clicks
const isProcessing = ref(false);

// --- METHODS ---
/**
 * Closes the modal by calling the action in the Pinia store.
 */
const closeModal = () => {
  appStore.closeApplicationModal();
};

/**
 * Handles the final submission of the job application.
 */
const handleConfirmApplication = async () => {
  // Guard clause to ensure a job is selected
  if (!appStore.jobToApply) return;

  // Set loading state to true and disable the button
  isProcessing.value = true;

  try {
    // Make the authenticated API call to the backend
    const response = await apiClient.post('/api/payment-intend', {
      job_id: appStore.jobToApply.id,
      payment_method: selectedPayment.value
    });

   window.location.href = response.data.redirect_url

  } catch (error) {
    // If the API call fails, show an error toast
    const message = error.response?.data?.message || 'Application failed. Please try again.';
    showToast('error', message);
  } finally {
    // No matter what happens, re-enable the button
    isProcessing.value = false;
  }
};
</script>
<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

/* In src/components/ApplicationModal.vue */

.modal-content {
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  position: relative;
  box-shadow: 0 5px 15px rgba(0,0,0,0.3);
  max-height: 90vh;
  overflow-y: auto;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 15px;
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: #aaa;
}
.close-button:hover {
  color: #333;
}

.job-details {
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 1rem;
  margin-bottom: 1rem;
}

.payment-details .amount {
  font-size: 2rem;
  font-weight: 700;
  color: var(--primary-green);
  margin: 0.5rem 0;
}

.payment-methods {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.payment-option {
  border: 2px solid var(--border-color);
  border-radius: 8px;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  flex: 1;
}

.payment-option:hover {
  border-color: var(--primary-green);
}

.payment-option.selected {
  border-color: var(--primary-green);
  box-shadow: 0 0 10px rgba(40, 167, 69, 0.5);
}

.payment-option img {
  width: 100%;
  max-height: 40px;
  object-fit: contain;
}

.modal-actions {
  margin-top: 2rem;
  text-align: right;
}
/* Add these new styles inside the <style scoped> tag */

/* Style for the button when it's in a loading state */
.btn.is-loading {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

/* The spinner element */
.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #fff;
  animation: spin 1s ease-in-out infinite;
  margin-right: 8px;
}

/* The spinning animation */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
