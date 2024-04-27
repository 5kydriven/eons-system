<script setup>
import { initFlowbite } from 'flowbite'
import { onMounted } from 'vue'
import ProductModal from '@/components/modals/ProductModal.vue'

onMounted(() => {
  initFlowbite()
})
</script>

<template>
  <div class="p-4 h-screen sm:ml-64 dark:bg-gray-800">
    <div class="p-4 mt-14">
      <h1 class="font-bold text-3xl mb-4 dark:text-white">Product List</h1>

      <div class="max-w-screen-xl">

        <!-- Start coding here -->
        <div class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">

          <!-- Buttons -->
          <div class="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">

            <div class="w-full md:w-1/2">
              <form class="flex items-center">
                <label for="simple-search" class="sr-only">Search</label>
                <div class="relative w-full">
                  <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor"
                      viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clip-rule="evenodd" />
                    </svg>
                  </div>
                  <input type="text" id="simple-search"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Search" />
                </div>
              </form>
            </div>

            <div
              class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
              <button type="button" data-modal-target="addProduct" data-modal-toggle="addProduct"
                class="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
                <svg class="h-4 w-4 mr-2 align-middle" fill="currentColor" viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path stroke-width="2" clip-rule="evenodd" fill-rule="evenodd"
                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                </svg>
                Add Product
              </button>
            </div>
          </div>

          <div class="h-100 overflow-y-hidden md:overflow-y-auto">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead
                class="text-xs sticky top-0 text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="px-4 py-3">Name</th>
                  <th scope="col" class="px-4 py-3">Brand</th>
                  <th scope="col" class="px-4 py-3">Category</th>
                  <th scope="col" class="px-4 py-3">Price</th>
                  <th scope="col" class="px-4 py-3">Stock</th>

                  <th scope="col" class="px-4 py-3">
                    <span class="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>

              <tbody>
                <!-- <EmployeeList 
                  v-for="(employee, index) in employees" :key="index"
                  :uid="employee.id"
                  :name="employee.name"
                  :category="employee.category"
                  :email="employee.email"
                  :password="employee.password"
                  :index="index"
                  @delete-employee="deleteEmployee"
                /> -->
                <tr class="border-b dark:border-gray-700">
                  <td scope="row" class="px-4 py-3 text-gray-900 whitespace-nowrap dark:text-white">
                    Tire
                  </td>
                  <td class="px-4 py-3">suzuki</td>
                  <td class="px-4 py-3">oil</td>
                  <td class="px-4 py-3">P 1000</td>
                  <td class="px-4 py-3">50</td>

                  <td class="px-4 py-3 flex items-center justify-center">
                    <button :id="'dropdown-button-' + index" :data-dropdown-toggle="'dropdown-' + index"
                      class="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100"
                      type="button">
                      <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewbox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                      </svg>
                    </button>
                    <div :id="'dropdown-' + index"
                      class="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                      <ul class="py-1 text-sm text-gray-700 dark:text-gray-200"
                        :aria-labelledby="'dropdown-button-' + index">
                        <li>
                          <a
                            class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit</a>
                        </li>
                        <li>
                          <a class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
                            @click="$emit('deleteEmployee', uid)">Delete</a>
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
  <ProductModal />
</template>