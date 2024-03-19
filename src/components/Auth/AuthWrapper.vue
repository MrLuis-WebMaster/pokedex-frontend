<script setup lang="ts">
import { onMounted } from 'vue';
import { jwtDecode } from 'jwt-decode';
import { useAuthStore } from '../../store/auth.store';

const authStore = useAuthStore();

const checkTokenExpiration = () => {
  const token = authStore.token;
  if (token) {
    const decodedToken = jwtDecode<{ exp: number }>(token) as { exp: number };
    const currentTime = Math.floor(Date.now() / 1000);
    if (decodedToken.exp < currentTime) {
      authStore.logout();
    }
  }
};

onMounted(() => {
  checkTokenExpiration();
});
</script>
<template>
    <slot></slot>
</template>

