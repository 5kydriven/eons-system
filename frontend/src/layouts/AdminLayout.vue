<script setup>
import Navbar from '@/components/adminLayout/AdminNavbar.vue';
import Sidebar from '@/components/adminLayout/AdminSidebar.vue';
</script>
<template>
    <Navbar />
    <Sidebar />
    <div class="p-4 sm:ml-64">
        <div class="p-4 mt-11">
            <slot></slot>
        </div>
    </div>
</template>