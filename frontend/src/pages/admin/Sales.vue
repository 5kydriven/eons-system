<script setup>
import LineChart from '@/components/charts/LineChart.vue'
import dailyOrders from '@/components/dailyOrders.vue';
import topSellingItem from '@/components/topSellingItem.vue';
import recentlyTransaction from '@/components/recentlyTransaction.vue';
import { useSaleStore } from '@/stores/SaleStore.js'

const store = useSaleStore();
</script>

<template>
    <h1 class="text-2xl md:text-3xl font-bold">Sales Report</h1>

    <div class="grid grid-cols-3 gap-3 mt-3">

        <div class="col-span-2 flex flex-col gap-3">
            <!-- Line Chart -->
            <div class="border rounded shadow-md border-gray-200 md:p-3">
                <LineChart />
            </div>

            <div class="rounded border shadow-md h-full relative">
                <label class="w-full text-lg px-4 py-2 font-bold text-left text-gray-900 block">
                    Top products
                </label>
                <topSellingItem />
                <div role="status" v-show="store.loading"
                    class="w-full h-full flex justify-center items-center bg-gray-500/[.5] text-lg font-bold text-primary-800 text-center leading-none absolute -translate-y-1/2 -translate-x-1/2 top-2/4 left-1/2">
                    <svg aria-hidden="true" class="w-10 h-10 text-gray-200 animate-spin fill-primary-400"
                        viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor" />
                        <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill" />
                    </svg>
                    <span class="sr-only">Loading...</span>
                </div>
            </div>
        </div>

        <div class="flex flex-col gap-3">
            <!-- summary of orders -->
            <div>
                <dailyOrders />
            </div>

            <!-- Transactions -->
            <div class="h-full rounded bg-white shadow-md border-gray-200 pb-0.5 relative">
                <div class="border-gray-200 w-full sticky top-0 p-1 border-b bg-gray-50">
                    <label class="text-lg font-semibold">
                        Recent Transactions
                    </label>
                </div>
                <recentlyTransaction />
                <div role="status" v-show="store.loading"
                    class="w-full h-full flex justify-center items-center bg-gray-500/[.5] text-lg font-bold text-primary-800 text-center leading-none absolute -translate-y-1/2 -translate-x-1/2 top-2/4 left-1/2">
                    <svg aria-hidden="true" class="w-10 h-10 text-gray-200 animate-spin fill-primary-400"
                        viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor" />
                        <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill" />
                    </svg>
                    <span class="sr-only">Loading...</span>
                </div>
            </div>
        </div>

    </div>
</template>