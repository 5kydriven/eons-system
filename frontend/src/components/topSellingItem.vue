<script setup>
import { computed, onMounted, ref } from 'vue';
import { getDocs } from "firebase/firestore";
import { transactionRef } from '@/composables/firebase.js'

const topItems = ref([])

const getTopSellingItems = async () => {
    try {
        const querySnapshot = await getDocs(transactionRef);
        const products = {};
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            if (data.items) {
                data.items.forEach((item) => {
                    if (item.uid) {
                        if (!products[item.uid]) {
                            products[item.uid] = {
                                quantity: 0,
                                name: '',
                                brand: '',
                                image: '',
                                price: 0,
                            };
                        }
                        products[item.uid].quantity += item.quantity || 0;
                        products[item.uid].name = item.name;
                        products[item.uid].brand = item.brand;
                        products[item.uid].image = item.image;
                        products[item.uid].price = item.price;
                    }
                })
            }
        });
        topItems.value = products;
        console.log(topItems.value);
    } catch (err) {
        console.error(err);
    }
};

const sortedItems = computed(() => {
    // Convert reactive object into an array of objects
    const itemsArray = Object.values(topItems.value);

    // Sort the array by quantity in descending order
    return itemsArray.sort((a, b) => b.quantity - a.quantity);
});

onMounted(() => {
    getTopSellingItems()
})
</script>
<template>
    <div class="overflow-y-auto">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sticky top-0">
                <tr>
                    <th scope="col" class="px-3 py-3">
                        Product name
                    </th>
                    <th scope="col" class="px-3 py-3">
                        Brand
                    </th>
                    <th scope="col" class="px-3 py-3">
                        Total Order
                    </th>
                    <th scope="col" class="px-3 py-3">
                        Price
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700" v-for="item in sortedItems">
                    <th scope="row"
                        class="px-3 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white flex items-center gap-2">
                        <img :src="item.image" class="w-10 h-10 rounded-full"> {{ item.name }}
                    </th>
                    <td class="px-3 py-1">
                        {{ item.brand }}
                    </td>
                    <td class="px-3 py-1">
                        {{ item.quantity }}
                    </td>
                    <td class="px-3 py-1">
                        ₱{{ item.price }}
                    </td>
                </tr>
            </tbody>

        </table>

    </div>
</template>