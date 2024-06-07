<template>
    <Chart type="pie" :data="chartData" :options="chartOptions" class="w-full md:w-30rem" />
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { db } from "../../stores/firebase.js";
import { collection, onSnapshot } from "firebase/firestore";

const names = ref([]);
const stocks = ref([]);
const chartData = ref(null);
const chartOptions = ref(null);

// Tailwind CSS color palette
const tailwindColors = [
    'bg-rose-500', 'bg-pink-500', 'bg-primary-500', 'bg-purple-500', 'bg-violet-500',
    'bg-indigo-500', 'bg-blue-500', 'bg-sky-500', 'bg-cyan-500', 'bg-teal-500',
    'bg-emerald-500', 'bg-green-500', 'bg-lime-500', 'bg-yellow-500', 'bg-amber-500',
    'bg-orange-500', 'bg-red-500', 'bg-gray-500', 'bg-stone-500', 'bg-neutral-500',
    'bg-zinc-500', 'bg-slate-500', 'bg-danger-500',
];

// Utility function to convert Tailwind color classes to actual colors
const getColorFromClass = (colorClass) => {
    const element = document.createElement('div');
    element.className = colorClass;
    document.body.appendChild(element);
    const color = getComputedStyle(element).backgroundColor;
    document.body.removeChild(element);
    return color;
};

// Generate a list of colors for the chart
const generateColorList = (count) => tailwindColors.slice(0, count).map(getColorFromClass);

// Fetch data from Firestore
const fetchData = () => {
    onSnapshot(collection(db, "products"), (querySnapshot) => {
        const fetchedNames = [];
        const fetchedStocks = [];
        querySnapshot.forEach((doc) => {
            fetchedNames.push(doc.data().name);
            fetchedStocks.push(doc.data().stock);
        });
        names.value = fetchedNames;
        stocks.value = fetchedStocks;
    });
};

// Computed property for chart data
const computedChartData = computed(() => ({
    labels: names.value,
    datasets: [{
        data: stocks.value,
        backgroundColor: generateColorList(names.value.length),
    }]
}));

// Computed property for chart options
const computedChartOptions = computed(() => ({
    plugins: {
        legend: {
            align: 'center',
            position: 'bottom'
        },
        title: {
            display: true,
            text: 'Unit Sold',
            align: 'start'
        }
    }
}));

// Watch for changes in names and stocks and update chart data and options
watch([names, stocks], () => {
    chartData.value = computedChartData.value;
    chartOptions.value = computedChartOptions.value;
});

// Fetch data and initialize the chart on component mount
onMounted(() => {
    fetchData();
    chartData.value = computedChartData.value;
    chartOptions.value = computedChartOptions.value;
});
</script>
