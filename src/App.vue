<script setup>
import { RouterView } from "vue-router";
import { useAuthStore } from "./stores/AuthStore";
import { onMounted } from "vue";
import { initFlowbite } from 'flowbite'


const authStore = useAuthStore();

onMounted(() => {
  initFlowbite();
  authStore.init();
})
</script>

<template>
  <RouterView />
</template>
