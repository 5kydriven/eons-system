<script setup>
import NavbarComponent from "../components/NavbarComponent.vue";
import SidebarComponent from "../components/SidebarComponent.vue";
import { RouterView } from "vue-router";
import { onMounted } from "vue";
import { initFlowbite } from "flowbite";

onMounted(() => {
  initFlowbite();
})
</script>

<template>
  <NavbarComponent />
  <SidebarComponent />

  <RouterView />
</template>
