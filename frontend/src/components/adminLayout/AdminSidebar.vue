<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
    <aside id="logo-sidebar"
        class="fixed top-0 left-0 z-20 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
        aria-label="Sidebar">
        <div class="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
            <ul class="space-y-2 font-medium">
                <li>
                    <RouterLink to="/dashboard"
                        class="flex gap-2 p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                        <i class="pi pi-home" style="font-size: 1.5rem"></i>
                        <span class="text-lg">Dashboard</span>
                    </RouterLink>
                </li>

                <li>
                    <RouterLink to="sales-report"
                        class="flex gap-2 p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                        <i class="pi pi-chart-line" style="font-size: 1.5rem"></i>
                        <span class="text-lg">Sales Report</span>
                    </RouterLink>
                </li>

                <li>
                    <RouterLink to="/inventory-list"
                        class="flex gap-2 p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                        <i class="pi pi-database" style="font-size: 1.5rem"></i>
                        <span class="text-lg">Inventory</span>
                    </RouterLink>
                </li>

                <li>
                    <RouterLink to="/employee-list"
                        class="flex gap-2 p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                        <i class="pi pi-users" style="font-size: 1.5rem"></i>
                        <span class="text-lg">Employee</span>
                    </RouterLink>
                </li>
            </ul>
        </div>
    </aside>
</template>
