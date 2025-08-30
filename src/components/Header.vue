<template>
  <header>
    <nav class="container">
      <router-link to="/" class="logo">JobPortal</router-link>
      <div class="auth-buttons">
        <router-link to="/login" class="btn btn-secondary">Login</router-link>
        <router-link to="/register" class="btn btn-primary">Register</router-link>
        <router-link to="/dashboard" class="btn btn-primary">dashboard</router-link>
      </div>
    </nav>
  </header>
</template>

<script setup>

import { RouterLink } from 'vue-router';
</script>

<style scoped>
/* add custom style */
</style>
