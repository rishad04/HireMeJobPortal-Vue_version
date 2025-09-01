import HomeView from '@/views/HomeView.vue';
import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      // Lazy-load the component for better performance
      component: () => import('../views/LoginView.vue'),
      meta: { requiresGuest: true }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue'),
      meta: { requiresGuest: true }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/DashboardView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/Payment-success/Upload-cv',
      name: 'payment-success-upload-cv',
      component: () => import('../views/PaymentSuccessView.vue'),
      meta: { requiresAuth: true }
    },
    // {
    //   path: '/profile',
    //   name: 'profile',
    //   component: () => import('../views/ProfileView.vue')
    // },
    // {
    //   path: '/settings',
    //   name: 'settings',
    //   component: () => import('../views/SettingsView.vue')
    // },
    // {
    //   path: '/admin',
    //   name: 'admin',
    //   component: () => import('../views/AdminView.vue')
    // },
    // {
    //   path: '/recruiter',
    //   name: 'recruiter',
    //   component: () => import('../views/RecruiterView.vue')
    // },
    // {
    //   path: '/create-job',
    //   name: 'create-job',
    //   component: () => import('../views/CreateJobView.vue')
    // }
  ],
})



// Global navigation guard
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const isAuthenticated = authStore.isAuthenticated;

  // Rule 1: If a route requires authentication and the user is not logged in, redirect to login.
  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'login' });
  }
  // Rule 2: If a route is for guests only and the user is logged in, redirect to the dashboard.
  else if (to.meta.requiresGuest && isAuthenticated) {
    next({ name: 'dashboard' });
  }
  // Rule 3: In all other cases, allow navigation.
  else {
    next();
  }
});


export default router
