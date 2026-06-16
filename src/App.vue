<!-- App.vue -->
<template>
  <div class="font-sans">
    <!-- Le Header reste visible partout -->
    <Header />
    
    <!-- Zone dynamique qui affichera la page active selon l'URL -->
    <router-view />
    
    <!-- Le Footer reste visible partout -->
    <Footer />
  </div>
</template>

<script setup>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
</script>