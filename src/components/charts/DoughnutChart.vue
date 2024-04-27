<script setup>
import { onMounted } from 'vue';
import Chart from 'chart.js/auto';

onMounted(() => {
    const ctx = document.getElementById('doughnutChart');

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: [
                'Red',
                'Blue',

            ],
            datasets: [{
                label: 'My First Dataset',
                data: [300, 50],
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',

                ],
                hoverOffset: 4
            }]
        },
        options: {
            plugins: {
                legend: {
                    align: 'center',
                    position: 'bottom'
                },
                title: {
                    display: true,
                    text: 'Unit Solds',
                    align: 'start'
                }
            },
            responsive: false,
        }
    })
})
</script>

<template>
    <canvas id="doughnutChart"></canvas>
</template>