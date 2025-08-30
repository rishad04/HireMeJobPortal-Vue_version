<script setup>
import { RouterView } from 'vue-router';
import ApplicationModal from './components/ApplicationModal.vue';
import Footer from './components/Footer.vue';
import Header from './components/Header.vue';
</script>

<template>
  <div id="app-wrapper">
    <Header />
    <RouterView />
    <Footer />

    <ApplicationModal />
  </div>

</template>

<style scoped>
/* This ensures the footer stays at the bottom */
#app-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex-grow: 1;
}
</style>
