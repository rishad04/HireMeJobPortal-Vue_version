import { createPinia } from 'pinia';
import 'sweetalert2/dist/sweetalert2.min.css';
import { createApp } from 'vue';
import apiClient from './api';
import App from './App.vue';
import './assets/main.css';
import router from './router';

apiClient.get('/sanctum/csrf-cookie').then(() => {
    const app = createApp(App);

    app.use(createPinia());
    app.use(router);

    app.mount('#app');
}).catch(error => {
    console.error("Could not fetch CSRF cookie:", error);
});
