<script setup>
import { RouterView } from 'vue-router'
import { useAuthStore } from './stores/auth';
import { onBeforeMount } from 'vue';

const authStore = useAuthStore();

onBeforeMount(() => {
  authStore.handleAuthState();
})
</script>

<template>
  <RouterView />
</template>

