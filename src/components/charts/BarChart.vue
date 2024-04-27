<script setup>
import { onMounted } from 'vue';
import Chart from 'chart.js/auto';

onMounted(() => {
    const ctx = document.getElementById('barChart');

    const DATA_COUNT = 6;
    const NUMBER_CFG = { count: DATA_COUNT, max: 100 };

    const labels = ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange',];

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Revenue',
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: 'rgb(255, 99, 132)',
                    stack: 'Stack 0',
                },
                {
                    label: 'Cost',
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: 'rgb(54, 162, 235)',
                    stack: 'Stack 0',
                },
            ]
        },
        options: {
            plugins: {
                legend: {
                    align: 'end',
                    position: 'top'
                },
                title: {
                    display: true,
                    align: 'start',
                    text: 'Revenue vs Costs',
                    position: 'top'
                },

            },
            responsive: true,
            interaction: {
                intersect: false,
            },
            scales: {
                x: {
                    stacked: true,
                },
                y: {
                    stacked: true
                }
            }
        }
    });
});
</script>



<template>
    <canvas id="barChart"></canvas>
</template>