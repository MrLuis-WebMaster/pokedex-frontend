<script setup lang="ts">
import Hero from './components/layout/Hero.vue';
import Footer from './components/layout/Footer.vue';
import Cards from './components/Pokemon/CardsPokemons.vue';
import Auth from './components/Auth/Auth.vue';
import { useAuthStore } from './store/auth.store';
import AuthWrapper from './components/Auth/AuthWrapper.vue';
const authStore = useAuthStore();
</script>

<template>
  <AuthWrapper>
    <Hero />
    <main class="container mx-auto p-8 min-h-screen select-none">
      <Auth v-if="!authStore.isLoggedIn" />
      <Cards v-if="authStore.isLoggedIn" />
    </main>
    <Footer />
  </AuthWrapper>
</template>
