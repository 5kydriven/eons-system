<script setup>
import ItemAdded from './ItemAdded.vue'
import TotalAmount from './TotalAmount.vue'
</script>
<template>
    <aside id="separator-sidebar" class="w-full md:w-1/4 bg-white shadow " aria-label="Sidebar">
        <div
            class="flex flex-col justify-between h-full px-3 py-4 overflow-y-auto bg-white border-l border dark:bg-gray-800">
            <div>
                <h1 class="text-gray-800 text-2xl font-bold mb-3">Total Items</h1>
                <div class="flex flex-col gap-1 overflow-y-auto h-72 border-0 border-b-2 border-gray-200 border-dashed">
                    <ItemAdded />
                </div>
            </div>

            <div class="flex flex-col gap-3">
                <TotalAmount />
            </div>
        </div>
    </aside>
</template>