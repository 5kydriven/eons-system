<script setup>
import { onMounted, ref, reactive } from "vue";
import { initFlowbite } from "flowbite";
import EmployeeModal from "../modals/EmployeeModal.vue";
import EmployeeList from "@/components/listEmployee/EmployeeList.vue"
import { useEmployeeStore } from "@/stores/employeeStore";

const employeeStore = useEmployeeStore()

onMounted(() => {
  initFlowbite();
  employeeStore.getEmployee();
});

// const showPassword = ref(Array(employeeStore.employees.length).fill(false));

const showToast = ref(false)
console.log(showToast.value)

const handleEmployeeAdded = (wasSuccessful) => {
  if (wasSuccessful) {
    showToast.value = !showToast.value
  } else {
    showToast.value = !showToast.value
  }

};

const employees = employeeStore.employees

const deleteEmployee = async (uid) => {
  console.log("clicked" + uid)
  await employeeStore.deleteEmployee(uid)
}
</script>

<template>
  <div v-show="showToast" class="w-full fixed top-16 z-30 flex justify-center md:justify-end md:px-10">
    <div id="toast-success"
      class=" flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
      role="alert">
      <div
        class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
          viewBox="0 0 20 20">
          <path
            d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
        </svg>
        <span class="sr-only">Check icon</span>
      </div>
      <div class="ms-3 text-sm font-normal">Added employee successfully.</div>
      <button type="button"
        class="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
        data-dismiss-target="#toast-success" aria-label="Close">
        <span class="sr-only">Close</span>
        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
        </svg>
      </button>
    </div>
  </div>
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
                <EmployeeList 
                  v-for="(employee, index) in employees" :key="index"
                  :uid="employee.id"
                  :name="employee.name"
                  :category="employee.category"
                  :email="employee.email"
                  :password="employee.password"
                  :index="index"
                  @delete-employee="deleteEmployee"
                />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>

  <EmployeeModal @employee-added="handleEmployeeAdded" />
</template>