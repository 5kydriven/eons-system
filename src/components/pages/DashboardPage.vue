<script setup>
import BarChart from '@/components/charts/BarChart.vue'
import DoughnutChart from '@/components/charts/DoughnutChart.vue'
</script>
<template>
  <div class="p-4 sm:ml-64">
    <div class="p-3 dark:border-gray-700 mt-14">
      <h1 class="text-2xl md:text-3xl font-bold">Hello, Eon! </h1>
      <label class="text-gray-500 text-xs md:text-sm ">Here's an overview of what is happening to your store.</label>

      <div class="md:border rounded-sm shadow-sm border-gray-200 mb-4 md:p-4 mt-2">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-2 ">

          <div class="flex flex-col h-24 md:h-28 bg-gray-50 md:bg-white p-3 md:border-r justify-between border-gray-200 dark:bg-gray-800">
            <label class="text-xs font-medium  md:text-base">Gross Sales</label>
            <div>
              <h1 class="text-md font-semibold md:font-bold md:text-2xl">₱ 10,000</h1>
              <label class="text-xs font-normal md:font-semibold">26%<span class="text-xs font-thin text-gray-300 ml-2">+ 1.2k today</span></label>
            </div>
          </div> 

          <div class="flex flex-col h-24 md:h-28 bg-gray-50 md:bg-white p-3 md:border-r justify-between border-gray-200 dark:bg-gray-800">
            <label class="text-xs font-medium  md:text-base">Gross Sales</label>
            <div>
              <h1 class="text-md font-semibold md:font-bold md:text-2xl">₱ 10,000</h1>
              <label class="text-xs font-normal md:font-semibold">26%<span class="text-xs font-thin text-gray-300 ml-2">+ 1.2k today</span></label>
            </div>
          </div> 

          <div class="flex flex-col h-24 md:h-28 bg-gray-50 md:bg-white p-3 md:border-r justify-between border-gray-200 dark:bg-gray-800">
            <label class="text-xs font-medium  md:text-base">Gross Sales</label>
            <div>
              <h1 class="text-md font-semibold md:font-bold md:text-2xl">₱ 10,000</h1>
              <label class="text-xs font-normal md:font-semibold">26%<span class="text-xs font-thin text-gray-300 ml-2">+ 1.2k today</span></label>
            </div>
          </div> 

          <div class="flex flex-col h-24 md:h-28 bg-gray-50 md:bg-white p-3 justify-between dark:bg-gray-800">
            <label class="text-xs font-medium  md:text-base">Gross Sales</label>
            <div>
              <h1 class="text-md font-semibold md:font-bold md:text-2xl">₱ 10,000</h1>
              <label class="text-xs font-normal md:font-semibold">26%<span class="text-xs font-thin text-gray-300 ml-2">+ 1.2k today</span></label>
            </div>
          </div> 
        </div>
      </div>

      
      <div>
        <div class="flex flex-col md:grid md:grid-cols-3  gap-3 mb-4">
          <div class="border shadow-sm border-gray-200 md:p-3 md:col-span-2">
            <BarChart />
          </div>
          <div class="border shadow-sm border-gray-200 p-3">
            <DoughnutChart />
          </div>
        </div>
      </div>

    </div>
  </div>
</template>
