<script setup>
import { ref, computed, onMounted } from 'vue'
import Sidebar from '@/components/CompactSidebar.vue'
import PosSidebar from '@/components/posComps/PosSidebar.vue'
import { useInventoryStore } from '../../stores/InventoryStore.js'
import { usePosStore } from '@/stores/PosStore.js';

const invStore = useInventoryStore();
const posStore = usePosStore();
const searchQuery = ref('');

onMounted(() => {
    invStore.fetchData();
});

const filteredProducts = computed(() => {
    return invStore.data.filter(product =>
        product.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
});
</script>

<template>
    <div class="flex h-screen">
        <Sidebar />
        <div class="main-content w-full ml-12 md:w-4/5 p-5 bg-gray-50 overflow-y-scroll">
            <div class="flex justify-between items-center mb-5">
                <h1 class="text-2xl font-bold text-gray-800">Making Orders</h1>
                <div class="flex space-x-2">
                    <span class="relative">
                        <i class="pi pi-search absolute top-2/4 -mt-2 left-3 text-surface-400 dark:text-surface-600" />
                        <InputText v-model="searchQuery" placeholder="Search" class="pl-10" />
                    </span>
                </div>
            </div>

            <!-- Product Grid -->
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700"
                    v-for="product in filteredProducts" :key="product.uid">
                    <div class="h-32 w-full relative">
                        <img :src="product.image" class="p-3 h-full w-full rounded-md"
                            :class="product.stock == 0 ? 'filter grayscale' : null">
                        <label v-show="product.stock == 0"
                            class="absolute right-3 rounded-l-lg text-xs px-1 py-0.5 top-6 bg-red-500 text-gray-50">Sold
                            Out</label>
                    </div>
                    <div class="px-3 pb-3">
                        <h5 :class="product.stock == 0 ? 'line-through text-gray-400' : 'text-gray-900'"
                            class="text-sm font-semibold mb-2 tracking-tight">
                            {{ product.name }} <span class="ml-0.5">{{ product.brand }}</span> </h5>
                        <div class="flex items-center justify-between">
                            <span :class="product.stock == 0 ? 'line-through text-gray-400' : ' text-blue-700'"
                                class="text-base font-bold">₱ {{ product.price }}</span>
                            <button v-if="product.stock == 0" type="button" disabled
                                class="focus:outline-none text-gray-400 border border-gray-300 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
                                Out of stock
                            </button>
                            <button type="button" v-else @click.prevent="posStore.addToCart(product)"
                                class="text-blue-700 bg-white border border-blue-300 hover:bg-blue-100 focus:ring-4 focus:outline-none focus:ring-blue-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2">
                                <svg class="w-3.5 h-3.5 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor" viewBox="0 0 18 21">
                                    <path
                                        d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
                                </svg>
                                Add ({{ product.stock }})
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Detail Items Section -->
        <PosSidebar />
    </div>
</template>
