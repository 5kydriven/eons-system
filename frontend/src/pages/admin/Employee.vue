<script setup>
import { ref, onMounted } from 'vue'
import { FilterMatchMode, FilterOperator } from 'primevue/api';
import { useInventoryStore } from '@/stores/InventoryStore';

const store = useInventoryStore();

const filters = ref()
const dialog = ref(false);

const employee = ref({
    name: "",
    email: "",
    password: "",
    category: "",
    image: ""
})

const initFilters = () => {
    filters.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { value: null },
        email: { value: null },
    };
};

initFilters();

onMounted(() => {
    store.loading = true
    store.getEmployeeData();
})
</script>
<template>
    <h1 class="font-bold text-3xl mb-4 dark:text-white">Employee List</h1>
    <DataTable tableStyle="min-width: 50rem" :loading="store.loading" removableSort stripedRows dataKey="id" scrollable
        scrollHeight="500px" v-model:filters="filters" :value="store.employee"
        :virtualScrollerOptions="{ itemSize: 46 }" :globalFilterFields="['name', 'email']">
        <template #header>
            <div class="flex justify-between">
                <div class="flex gap-2">
                    <Button type="button" icon="pi pi-filter-slash" label="Clear" outlined />
                    <!-- <Button icon="pi pi-external-link" label="Export Displayed" @click="exportCSV()" /> -->
                    <Button icon="pi pi-external-link" label="Export All" outlined />
                    <Button icon="pi pi-plus" label="Add Employee" @click="dialog = true" />
                </div>

                <span class="relative">
                    <i class="pi pi-search absolute top-2/4 -mt-2 left-3 text-surface-400 dark:text-surface-600" />
                    <InputText placeholder="Keyword Search" v-model="filters['global'].value"
                        class="pl-10 font-normal" />
                </span>
            </div>
        </template>
        <template #empty> No Books found. </template>
        <Column header="#" headerStyle="width: 3rem; font-weight: bold;" bodyStyle="font-weight: bold;">
            <template #body="slotProps">
                {{ slotProps.index + 1 }}
            </template>
        </Column>
        <Column field="name" sortable header="Name"></Column>
        <Column field="email" sortable header="Email"></Column>
        <Column field="category" header="Category"></Column>
        <Column headerStyle="width: 10rem">
            <template #body="{ data }">
                <Button severity="danger" icon="pi pi-trash" label="Delete" outlined />
            </template>
        </Column>
    </DataTable>

    <Dialog v-model:visible="dialog" modal header="Add Product" :style="{ width: '28rem' }" :draggable="false">
        <form @submit.prevent="addEmployee(employee)">
            <div class="grid gap-4 mb-4 sm:grid-cols-2">
                <div>
                    <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                    <input type="text" name="name" id="name" v-model="employee.name"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Type name of the employee" required>
                </div>
                <div>
                    <label for="Postion"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Position</label>
                    <select id="category" v-model="employee.category" required
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                        <option value="cashier">Cashier</option>
                    </select>
                </div>
                <div>
                    <label for="Username"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                    <input type="email" v-model="employee.email"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="user@gmail.com" required>
                </div>
                <div>
                    <label for="Password"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                    <input type="password" v-model="employee.password"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="••••••••" required>
                </div>
                <div class="sm:col-span-2">
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Upload
                        picture</label>
                    <input @change="detectImage"
                        class="block w-full text-lg placeholder-gray-400 file:rounded-l-lg file:bg-gray-500 file:text-white file:border-0 text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
                        type="file">
                    <div class="mt-1 text-xs text-gray-500 dark:text-gray-300">A product
                        picture is useful to easily identify but it is not mandatory</div>
                </div>
            </div>
            <div class="flex justify-end">
                <Button label="add" icon="pi pi-plus" />
            </div>
        </form>
    </Dialog>
</template>