<script setup>
import { useSaleStore } from '@/stores/SaleStore.js';
import { transactionRef } from '@/composables/firebase.js';
import { onSnapshot } from 'firebase/firestore';
import { ref, onMounted } from 'vue'

const store = useSaleStore()

const dailyOrders = ref(0);

const getDailyOrders = () => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Set the time to 00:00:00

        onSnapshot(transactionRef, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const items = doc.data().items;
                const timestamp = doc.data().timestamp;
                const date = timestamp.toDate(); // Convert Timestamp to Date
                date.setHours(0, 0, 0, 0); // Set the time to 00:00:00

                // Check if the date of the order is the same as today
                if (date.getTime() === today.getTime()) {
                    // console.log(items)
                    dailyOrders.value += 1
                }
            });
            // console.log(dailyOrders.value);
        });
    } catch (err) {
        console.log(err)
    }
}

onMounted(() => {
    getDailyOrders()
})
</script>

<template>
    <div class="border shadow-md border-gray-200 flex rounded h-48 basis-1/3">
        <div class="w-full px-3 pt-9 border-gray-200 border-r">
            <img src="/profits.png" class="mb-2">
            <h1 class="text-xl font-bold mb-4 text-gray-800">Today's Profit</h1>
            <label class="text-lg font-medium text-gray-600">₱ {{ store.dailyProfit.toFixed(2) }}</label>
        </div>
        <div class=" w-full px-3 pt-9">
            <img src="/package.png" class="mb-2">
            <h1 class="text-xl font-bold mb-4 text-gray-800">Today's Order</h1>
            <label class="text-lg font-medium text-gray-600"> {{ dailyOrders }} </label>
        </div>
    </div>
</template>