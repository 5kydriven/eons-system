<script setup>
import { onMounted, ref } from "vue";
import { initFlowbite } from "flowbite";
import EmployeeModal from "../modals/EmployeeModal.vue";

onMounted(() => {
  initFlowbite();
});

const showPassword = ref(Array(3).fill(false));

const isClicked = (index) => {
  showPassword.value[index] = !showPassword.value[index];
};

</script>

<template>
  <div class="p-4 h-screen sm:ml-64 dark:bg-gray-800">
    <div class="p-4 mt-14">
      <h1 class="font-bold text-3xl mb-4 dark:text-white">Employee List</h1>

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
              <button type="button" data-modal-target="defaultModal" data-modal-toggle="defaultModal"
                class="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
                <svg class="h-4 w-4 mr-2 align-middle" fill="currentColor" viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path stroke-width="2" clip-rule="evenodd" fill-rule="evenodd"
                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                </svg>
                Add Employee
              </button>
            </div>
          </div>

          <div class="h-100 overflow-y-hidden md:overflow-y-auto">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead
                class="text-xs sticky top-0 text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="px-4 py-3">Name</th>
                  <th scope="col" class="px-4 py-3">Position</th>
                  <th scope="col" class="px-4 py-3">Username</th>
                  <th scope="col" class="px-4 py-3">Password</th>

                  <th scope="col" class="px-4 py-3">
                    <span class="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="(item, index) in Array(3)" :key="index" class="border-b dark:border-gray-700">
                  <td scope="row" class="px-4 py-3 text-gray-900 whitespace-nowrap dark:text-white">
                    Dulce Amor Olmedo
                  </td>
                  <td class="px-4 py-3">Cashier</td>
                  <td class="px-4 py-3">dulce123</td>
                  <td class="px-4 py-3">
                    <div class="relative">
                      <!-- Conditional rendering of password -->
                      <label v-if="!showPassword[index]">
                        ••••••••
                      </label>
                      <label v-else>
                        asdfasdf
                      </label>
                      <!-- Toggle icon -->
                      <span type="button" class="cursor-pointer absolute right-10" @click="isClicked(index)">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                          stroke="currentColor"
                          :class="{ 'text-gray-500': !showPassword[index], 'text-blue-500': showPassword[index] }"
                          class="w-6 h-6 hover:text-blue-300">
                          <path v-if="!showPassword[index]" strokeLinecap="round" strokeLinejoin="round"
                            d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                          <path v-else strokeLinecap="round" strokeLinejoin="round"
                            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                        </svg>
                      </span>
                    </div>
                  </td>

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
                          <a href="#"
                            class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit</a>
                        </li>
                        <li>
                          <a href="#"
                            class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Delete</a>
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

  <EmployeeModal />
</template>
