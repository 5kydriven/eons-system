<script setup>
import { computed, onMounted } from 'vue';
import { useSaleStore } from '@/stores/SaleStore.js'

const store = useSaleStore();

const sumPrice = (price, quantity) => {
    return computed(() => price * quantity)
}

const formatTimestamp = (date) => {
    const month = date.getMonth() + 1; // Add 1 because getMonth() returns zero-based index
    const day = date.getDate();
    const year = date.getFullYear();
    const hour = date.getHours();
    const minute = date.getMinutes().toString().padStart(2, '0');;

    return `${month}/${day}/${year} ${hour}:${minute}`;
}

onMounted(() => {
    store.getAllTransaction()
})
</script>

<template>
    <div class="h-[460px] overflow-y-scroll">
        <div class="flex items-center gap-2 flex-col p-1">
            <div class="border border-gray-200 shadow-sm w-full rounded p-2 bg-white"
                v-for="items in store.transaction">
                <div class="flex justify-between">
                    <label class="text-xs font-semibold text-gray-800">{{ items.id }}</label>
                    <p class="text-xs font-semibold text-gray-800">{{ formatTimestamp(items.timestamp.toDate()) }}</p>
                </div>
                <hr class="my-0.5">
                <div class="flex justify-between" v-for="item in items.items">
                    <label class="text-xs font-semibold text-gray-500">{{ item.name }} <span>{{ item.brand }}</span> ({{
                        item.quantity }}pc)</label>
                    <p class="text-xs font-semibold text-gray-500">₱ {{ sumPrice(item.price, item.quantity) }}</p>
                </div>
                <hr class="my-0.5">
                <div class="flex justify-between">
                    <label class="font-semibold text-xs text-gray-400">Discount: </label>
                    <p class="font-semibold text-xs text-gray-400">{{ items.discount }} %</p>
                </div>
                <div class="flex justify-between">
                    <label class="font-semibold text-sm">Total: </label>
                    <p class="font-semibold text-sm">₱ {{ items.totalAmount.toFixed(2) }}</p>
                </div>
            </div>

        </div>
    </div>
</template>