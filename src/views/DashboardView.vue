<template>
  <main class="container">
    <div class="row">
      <aside class="col-4 dashboard-sidebar">
        <div class="profile-card">
          <!-- <img src="https://via.placeholder.com/80" alt="User Avatar" class="profile-avatar"> -->
          <h3 class="profile-name">{{ authStore.user.name }}</h3>
          <p class="profile-email">{{ authStore.user.email }}</p>
        </div>
        <nav class="dashboard-nav">
           <ul>
              <li>
                <!-- <a href="dashboard.html" class="active">Applied Jobs</a> -->
                <router-link to="/dashboard" class="active" >Applied Jobs</router-link>
              </li>
              <li>
                <!-- <a href="dashboard.html" class="active">Applied Jobs</a> -->
                <router-link to="/" >Browse Jobs</router-link>
              </li>
              <!-- <li><a href="profile.html">My Profile</a></li>
              <li><a href="settings.html">Settings</a></li>
              <li><a href="#">Help</a></li> -->
          </ul>
        </nav>
      </aside>

      <section class="col-8 dashboard-main-content">
        <h2>Your Application History</h2>
        <div class="content-card">
          <table v-if="isLoading" class="data-table">
            <thead>
              <tr>
                <th>Job Title</th>
                <th>Company</th>
                <th>Date Applied</th>
                <th>Status</th>
                <th>Payment</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="n in 5" :key="n">
                <td><div class="skeleton skeleton-text"></div></td>
                <td><div class="skeleton skeleton-text"></div></td>
                <td><div class="skeleton skeleton-text"></div></td>
                <td><div class="skeleton skeleton-text"></div></td>
                <td><div class="skeleton skeleton-text"></div></td>
                <td><div class="skeleton skeleton-text"></div></td>
              </tr>
            </tbody>
          </table>

          <table v-else-if="applications.length > 0" class="data-table">
            <thead>
              <tr>
                <th>Job Title</th>
                <th>Company</th>
                <th>Date Applied</th>
                <th>Status</th>
                <th>Payment</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="app in applications" :key="app.id">
                <td>{{ app.job.title }}</td>
                <td>{{ app.job.company }}</td>
                <td>{{ app.applied_at }}</td>
                <td><span class="status-tag active">{{ app.status }}</span></td>
                <td><span class="status-tag active">{{ app.payment_status }}</span></td>
 <td>
                  <button v-if="app.status !== 'submitted'" @click="handleDelete(app.id)" class="btn-delete" title="Delete Application">
                    &times;
                  </button>
                </td>

              </tr>
            </tbody>
          </table>

          <div v-else class="empty-state">
            <h3>You haven't applied to any jobs yet.</h3>
            <p>Your applications will appear here once you apply for a job.</p>
            <router-link to="/" class="btn btn-primary">Find Jobs</router-link>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import apiClient from '../api';
import { useAuthStore } from '../stores/auth';

import Swal from 'sweetalert2';
import { useToast } from '../composables/useToast';

// --- STATE ---
const authStore = useAuthStore();
const applications = ref([]);
const isLoading = ref(true);

const { showToast } = useToast();

// --- DYNAMIC CLASS METHODS ---
const getStatusClass = (status) => {
  if (status === 'submitted') return 'success';
  if (status === 'processing') return 'warning';
  return 'default';
};


// --- METHODS ---
/**
 * Fetches the user's application history from the API.
 */
const fetchApplications = async () => {
  try {
    const response = await apiClient.get('/api/user-applications');
    // The resource collection wraps the data in a 'data' key
    applications.value = response.data.data;
  } catch (error) {
    console.error('Failed to fetch applications:', error);
  } finally {
    isLoading.value = false;
  }
};

const handleDelete = async (applicationId) => {

  console.log(applicationId);
  const result = await Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#28a745',
    cancelButtonColor: '#dc3545',
    confirmButtonText: 'Yes, delete it!'
  });

  if (result.isConfirmed) {
    // 1. Make the API call to the new DELETE endpoint
      const response = await apiClient.delete(`/api/user-application/delete/${applicationId}`);

      // 2. If the API call is successful, then filter the item from the local list
      applications.value = applications.value.filter(app => app.id !== applicationId);

    showToast('success', 'Application has been deleted.');
  }
};

// --- LIFECYCLE HOOKS ---
onMounted(() => {
  fetchApplications();
});
</script>

<style scoped>
/* Scoped styles specific to this component */
.empty-state {
  text-align: center;
  padding: 3rem;
}
.empty-state h3 {
  font-size: 1.5rem;
}
.empty-state p {
  color: var(--secondary-text);
  margin-bottom: 1.5rem;
}

/* === NEW STYLES === */

/* Active state for Header Dashboard button */
.auth-buttons .btn.router-link-exact-active {
  background-color: var(--primary-green);
  color: var(--white-color);
}

/* Active state for Sidebar nav links */
.dashboard-nav li a.router-link-exact-active {
  background-color: var(--primary-green);
  color: var(--white-color);
}

/* New Status Tag Colors */
.status-tag.success { background-color: var(--primary-green); }
.status-tag.warning { background-color: #ffc107; color: var(--dark-text); }
.status-tag.danger { background-color: var(--danger-red); }
.status-tag.default { background-color: var(--secondary-text); }


/* Delete Button Styling */
.btn-delete {
  background: none;
  border: none;
  color: var(--danger-red);
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
  line-height: 1;
  padding: 0 0.5rem;
  transition: transform 0.2s ease;
}
.btn-delete:hover {
  transform: scale(1.2);
}
</style>
