<template>
  <main class="container">
    <div class="content-card standalone-card">
      <h2>Payment Successful!</h2>
      <p class="subtitle">Just one more step. Please upload your CV/Resume to complete your application.</p>

      <form @submit.prevent="handleUpload" class="upload-form">
        <div class="file-input-wrapper">
          <input type="file" @change="handleFileChange" accept=".pdf,.png,.jpg,.jpeg" class="file-input" ref="fileInputRef">
          <div class="file-input-label">
            {{ fileLabel }}
          </div>
        </div>

        <div v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>

        <div class="form-actions">
          <button type="submit" class="btn btn-primary" :disabled="!selectedFile || isUploading">
            {{ isUploading ? 'Uploading...' : 'Upload & Complete Application' }}
          </button>
        </div>
      </form>
      <div class="form-help-text">
        Accepted formats: PDF, PNG, JPG. Max size: 5MB.
      </div>
    </div>
  </main>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import apiClient from '../api';
import { useToast } from '../composables/useToast';

const route = useRoute();
const router = useRouter();
const { showToast } = useToast();

const applicationId = ref(null);
const selectedFile = ref(null);
const errorMessage = ref('');
const isUploading = ref(false);
const fileInputRef = ref(null);

// A computed property to show a user-friendly label for the file input
const fileLabel = computed(() => {
  if (selectedFile.value) {
    return selectedFile.value.name;
  }
  return 'Click to choose a file...';
});

// Get the application ID from the URL when the component loads
onMounted(() => {
  if (route.query.application_id) {
    applicationId.value = route.query.application_id;
  } else {
    showToast('error', 'No application ID found. Redirecting...');
    router.push('/dashboard');
  }
});

const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (!file) return;

  // --- Client-side validation ---
  const allowedTypes = ['application/pdf', 'image/png', 'image/jpeg'];
  if (!allowedTypes.includes(file.type)) {
    errorMessage.value = 'Invalid file type. Please upload a PDF, PNG, or JPG.';
    selectedFile.value = null;
    fileInputRef.value.value = ''; // Clear the input
    return;
  }

  const maxSize = 5 * 1024 * 1024; // 5MB
  if (file.size > maxSize) {
    errorMessage.value = 'File is too large. Maximum size is 5MB.';
    selectedFile.value = null;
    fileInputRef.value.value = ''; // Clear the input
    return;
  }

  // If validation passes
  errorMessage.value = '';
  selectedFile.value = file;
};

const handleUpload = async () => {
  if (!selectedFile.value) return;

  isUploading.value = true;

  // We must use FormData to send files
  const formData = new FormData();
  formData.append('cv', selectedFile.value);
  formData.append('application_id', applicationId.value);

  try {
    const response = await apiClient.post('/api/applications/upload-cv', formData, {
       headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    showToast('success', response.data.message);
    router.push('/dashboard');
  } catch (error) {
    const message = error.response?.data?.message || 'File upload failed.';
    showToast('error', message);
  } finally {
    isUploading.value = false;
  }
};
</script>

<style scoped>
.standalone-card {
  max-width: 600px;
  margin: 2rem auto;
}
.subtitle {
  color: var(--secondary-text);
  text-align: center;
  margin-bottom: 2rem;
}
.upload-form {
  margin-top: 1.5rem;
}
.file-input-wrapper {
  position: relative;
  border: 2px dashed var(--border-color);
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  transition: border-color 0.2s ease;
}
.file-input-wrapper:hover {
  border-color: var(--primary-green);
}
.file-input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}
.file-input-label {
  color: var(--secondary-text);
  font-weight: 500;
}
.error-message {
  color: var(--danger-red);
  margin-top: 1rem;
  text-align: center;
}
.form-actions {
  text-align: center;
  margin-top: 1.5rem;
}
.form-help-text {
  text-align: center;
  color: var(--secondary-text);
  font-size: 0.9rem;
  margin-top: 1rem;
}
</style>
