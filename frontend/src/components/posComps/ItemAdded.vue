<script setup>
import { usePosStore } from '@/stores/PosStore';

const posStore = usePosStore();
</script>
<template>
    <div class="flex flex-col items-center md:flex-row md:max-w-xl gap-2" v-for="product in posStore.cart"
        v-show="product.quantity > 0">
        <img class="object-cover w-full rounded-t-lg h-full sm:h-11 sm:w-11 md:h-15 md:w-15 md:rounded-md" :src="product.image" alt="">
        <div class="flex flex-col justify-between w-full p-2">
            <div class="flex justify-between items-start">
                <div class="flex flex-col">
                    <h1 class="text-xs text-gray-500">Name: <span class="font-semibold text-gray-900">{{ product.name
                            }}</span></h1>
                    <label class="text-xs text-gray-500">Brand: <span class="text-gray-900 ml-1 font-semibold">{{
                        product.brand }}</span></label>
                </div>
                <div class="border flex items-center justify-between w-16 text-sm">
                    <button @click.prevent="posStore.decrementCartQuantity(product.uid)"
                        class="border-r px-1.5 font-bold text-gray-400">-</button>
                    {{ product.quantity }}
                    <button @click.prevent="posStore.incrementCartQuantity(product.uid)"
                        class="border-l px-1.5 font-bold text-gray-400">+</button>
                </div>
            </div>
            <div class="flex justify-between items-center">
                <label class="text-xs text-gray-500">Category: <span class="text-gray-900 ml-1 font-semibold">{{
                    product.category }}</span></label>

                <label class="border text-xs rounded-full border-blue-400 px-1.5 py-0.5 font-medium text-blue-500">₱
                    {{ product.price }}</label>
            </div>
        </div>
    </div>
</template>