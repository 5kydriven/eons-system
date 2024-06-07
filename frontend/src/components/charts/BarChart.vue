<script setup>
import { onMounted, ref } from 'vue';
import Chart from 'chart.js/auto';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../../stores/firebase.js'; // import your Firebase configuration
import { useSaleStore } from '@/stores/SaleStore.js'

const store = useSaleStore();

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const salesData = ref(months.map(() => 0)); // Initializing sales data array
const expensesData = ref(months.map(() => 0)); // Initializing expenses data array

const transactionQuery = query(
    collection(db, "transactions"),
    where("timestamp", ">=", new Date(new Date().getFullYear(), 0, 1)),
    where("timestamp", "<", new Date(new Date().getFullYear() + 1, 0, 1))
);

let chartInstance;

const initializeChart = () => {
    const ctx = document.getElementById('barChart').getContext('2d');

    chartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: months,
            datasets: [
                {
                    label: 'Sales',
                    data: salesData.value,
                    backgroundColor: 'rgb(16 185 129)',
                },
                {
                    label: 'Expenses',
                    data: expensesData.value,
                    backgroundColor: 'rgb(239 68 68)',
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
                    text: 'Sales vs Expenses',
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
        chartInstance.data.datasets[1].data = expensesData.value;
        chartInstance.update();
        store.loading = false
    }
};

const getAllData = () => {
    store.loading = true
    onSnapshot(transactionQuery, (querySnapshot) => {
        // Reset data to ensure accurate calculations
        salesData.value = months.map(() => 0);
        expensesData.value = months.map(() => 0);

        querySnapshot.forEach((doc) => {
            const { items, timestamp } = doc.data();
            const date = timestamp.toDate();
            const monthIndex = date.getMonth();

            if (Array.isArray(items)) {
                items.forEach((item) => {
                    salesData.value[monthIndex] += item.price * item.quantity;
                    expensesData.value[monthIndex] += item.marketPrice * item.quantity;
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

<template>
    <canvas id="barChart"></canvas>
</template>
