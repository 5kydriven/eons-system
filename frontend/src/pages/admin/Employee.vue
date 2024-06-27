<script setup>
import { ref, onMounted } from 'vue'
import { FilterMatchMode, FilterOperator } from 'primevue/api';
import { useInventoryStore } from '@/stores/InventoryStore';
import AddEmployee from '@/components/adminForms/AddEmployeeForm.vue'
import { doc, deleteDoc } from "firebase/firestore";
import { useToast } from 'primevue/usetoast';

const store = useInventoryStore();
const toast = useToast();

const filters = ref()
const dialog = ref(false);

const initFilters = () => {
    filters.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { value: null },
        email: { value: null },
    };
};

initFilters();

const deleteEmployee = async (uid) => {
    try {
        const response = await fetch('http://localhost:8080/deleteUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Set content type to JSON
            },
            body: JSON.stringify(uid) // Convert data to JSON string
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const result = await response.json();

        await deleteDoc(doc(db, "employee", result.uid));

        await deleteDoc(doc(db, "accountRoles", result.uid));

        toast.add({ severity: 'success', summary: 'Success Message', detail: 'Successfully deleted employee!', life: 3000 });
    } catch (error) {
        toast.add({ severity: 'error', summary: 'Error Message', detail: 'Something went wrong!', life: 3000 });
        console.log(error);
    }
}

const addResult = (res) => {
    addDialog.value = false
    if (res == 'success') {
        toast.add({ severity: 'success', summary: 'Success Message', detail: 'Successfully added employee!', life: 3000 });
    } else {
        toast.add({ severity: 'error', summary: 'Error Message', detail: 'Something went wrong!', life: 3000 });
    }
}

onMounted(() => {
    store.loading = true
    store.getEmployeeData();
})
</script>
<template>
    <h1 class="font-bold text-2xl mb-4 text-gray-800 dark:text-white">Employee List</h1>
    <DataTable tableStyle="min-width: 50rem" :loading="store.loading" removableSort stripedRows dataKey="id" scrollable
        scrollHeight="400px" v-model:filters="filters" :value="store.employee"
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
        <Column header="Actions" Style="width: 10rem">
            <template #body="{ data }">
                <Button severity="danger" icon="pi pi-trash" label="Delete" size="small" outlined
                    @click="deleteEmployee(data.uid)" />
            </template>
        </Column>
    </DataTable>

    <Dialog v-model:visible="dialog" modal header="Add Employee" :style="{ width: '30rem' }" :draggable="false">
        <AddEmployee @result="addResult" />
    </Dialog>

    <Toast />
</template>