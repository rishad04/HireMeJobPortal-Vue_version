// src/composables/useToast.js
import Swal from 'sweetalert2';

// We create a customized instance of SweetAlert2 for our toasts.
// This ensures all toasts in our app look and feel the same.
const Toast = Swal.mixin({
  toast: true,
  position: 'top-end', // Position it on the top-right corner
  showConfirmButton: false,
  timer: 3000, // Toasts will disappear after 3 seconds
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  }
});

// This is our composable function
export function useToast() {

  /**
   * Fires a toast notification.
   * @param {string} icon - The icon to display ('success', 'error', 'warning', 'info', 'question')
   * @param {string} message - The message to show in the toast.
   */
  const showToast = (icon, message) => {
    Toast.fire({
      icon: icon,
      title: message
    });
  };

  // We return the function so it can be used in any component
  return { showToast };
}
