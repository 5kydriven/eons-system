<template>
    <canvas id="lineChart"></canvas>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import Chart from 'chart.js/auto';
import { query, where, onSnapshot } from 'firebase/firestore';
import { transactionRef } from '@/composables/firebase'; // import your Firebase configuration
import { useSaleStore } from '@/stores/SaleStore.js'

const store = useSaleStore();

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const salesData = ref(months.map(() => 0)); // Initializing sales data array

const transactionQuery = query(
    transactionRef,
    where("timestamp", ">=", new Date(new Date().getFullYear(), 0, 1)),
    where("timestamp", "<", new Date(new Date().getFullYear() + 1, 0, 1))
);

let chartInstance;

const initializeChart = () => {
    const ctx = document.getElementById('lineChart').getContext('2d');

    chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: months,
            datasets: [
                {
                    label: 'Sales',
                    data: salesData.value,
                    fill: false,
                    borderColor: 'rgb(16, 185, 129)',
                    tension: 0.3
                },
            ],
        },
        options: {
            plugins: {
                legend: {
                    align: 'end',
                    position: 'top',
                },
                title: {
                    display: true,
                    align: 'start',
                    text: 'Monthly Sales',
                    position: 'top',
                },
            },
            responsive: true,
            interaction: {
                intersect: false,
            },
        },
    });
};

const updateChart = () => {
    if (chartInstance) {
        chartInstance.data.datasets[0].data = salesData.value;
        chartInstance.update();
        store.loading = false;
    }
};

const getAllData = () => {
    store.loading = true;
    onSnapshot(transactionQuery, (querySnapshot) => {
        // Reset data to ensure accurate calculations
        salesData.value = months.map(() => 0);

        querySnapshot.forEach((doc) => {
            const { items, timestamp } = doc.data();
            const date = timestamp.toDate();
            const monthIndex = date.getMonth();

            if (Array.isArray(items)) {
                items.forEach((item) => {
                    salesData.value[monthIndex] += item.price * item.quantity;
                });
            }
        });

        updateChart();
    });
};

onMounted(() => {
    initializeChart();
    getAllData();
});
</script>
