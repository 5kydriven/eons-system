<script setup>
import { usePosStore } from '@/stores/PosStore';
import { ref } from 'vue'

const isLoading = ref(false);

const posStore = usePosStore();

</script>
<template>
    <div class="flex flex-col gap-5">
        <div>
            <div class="w-full flex justify-between items-center px-1">
                <label class="text-gray-500 text-sm">Item</label>
                <span class="font-semibold text-gray-800 text-sm">{{ posStore.totalQuantity }} (Items)</span>
            </div>
            <div class="w-full flex justify-between items-center px-1">
                <label class="text-gray-500 text-sm">Discount</label>
                <input type="number" placeholder="0%" id="small-input" v-model="posStore.discount"
                    class="block w-30 p-1 text-gray-500 border-0 border-b-2 border-gray-300 bg-transparent bg-gray-50 text-xs focus:outline-none focus:ring-0">
            </div>
            <div class="w-full flex justify-between items-center px-1">
                <label class="text-gray-500 text-sm">Cash</label>
                <div>
                    <input type="number" id="small-input" placeholder="₱ 0" v-model="posStore.money"
                        @input="posStore.validateMoney"
                        class="block w-30 p-1 text-gray-500 border-0 border-b-2 border-gray-300 bg-transparent bg-gray-50 text-xs focus:outline-none focus:ring-0 "
                        :class="posStore.errorMessage ? 'focus:border-red-600' : null">
                    <p class="absolute text-xs font-semibold text-red-600 dark:text-red-500"
                        v-if="posStore.errorMessage">{{ posStore.errorMessage }}</p>
                </div>
            </div>
        </div>

        <div>
            <div class="w-full flex justify-between px-1">
                <label class="text-base text-gray-800 font-semibold">Changed</label>
                <span class="font-semibold text-gray-800 text-base"
                    :class="posStore.changed < 0 ? 'text-red-600' : null">₱ {{ posStore.changed.toFixed(2) }}</span>
            </div>
            <div class="w-full flex justify-between px-1">
                <label class="base text-gray-800 font-bold">Total</label>
                <span class="font-bold text-gray-800 base">₱ {{ posStore.totalAmount.toFixed(2) }}</span>
            </div>
        </div>
    </div>
    <div class="flex flex-col gap-2">
        <button type="button" v-if="!posStore.isLoading" @click.prevent="posStore.payNow"
            :disabled="posStore.isCartEmpty"
            class="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-bold rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Pay
            Now</button>
        <button disabled type="button" v-else
            class="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center justify-center">
            <svg aria-hidden="true" role="status" class="inline w-4 h-4 me-3 text-white animate-spin"
                viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB" />
                <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor" />
            </svg>
            Loading...
        </button>
        <button type="button" @click.prevent="posStore.clearCart" :disabled="posStore.isCartEmpty"
            class="text-gray-600 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-bold rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Cancel</button>
    </div>
</template>