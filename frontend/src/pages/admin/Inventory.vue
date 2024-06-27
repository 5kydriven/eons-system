<script setup>
import { ref, onMounted } from 'vue'
import { useInventoryStore } from '@/stores/InventoryStore';
import { FilterMatchMode, FilterOperator } from 'primevue/api';
import AddForm from '@/components/adminForms/AddProductForm.vue';
import EditForm from '@/components/adminForms/EditForm.vue';
import { useToast } from 'primevue/usetoast';

const invStore = useInventoryStore();
const toast = useToast();

const filters = ref();
const op = ref();
const addDialog = ref(false);
const editDialog = ref(false);
const selectedProduct = ref(null)


const getSeverity = (stock) => {
    if (stock >= 100) {
        return 'success';
    } else if (stock > 0) {
        return 'warning';
    } else {
        return 'danger';
    }
};

const initFilters = () => {
    filters.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { value: null },
        brand: { value: null },
        category: { value: null },
        price: { value: null },
        stock: { value: null },
    };
};

initFilters();

const toggle = (data) => {
    selectedProduct.value = data;
    op.value.toggle(event);
}

const editResult = (res) => {
    editDialog.value = false
    if (res == 'success') {
        toast.add({ severity: 'success', summary: 'Success Message', detail: 'Successfully updated product!', life: 3000 });
    } else {
        toast.add({ severity: 'error', summary: 'Error Message', detail: 'Something went wrong!', life: 3000 });
    }
}

const addResult = (res) => {
    addDialog.value = false
    if (res == 'success') {
        toast.add({ severity: 'success', summary: 'Success Message', detail: 'Successfully added product!', life: 3000 });
    } else {
        toast.add({ severity: 'error', summary: 'Error Message', detail: 'Something went wrong!', life: 3000 });
    }
}

const deleteProduct = (uid) => {
    try {
        invStore.deleteProduct(uid)
        toast.add({ severity: 'success', summary: 'Success Message', detail: 'Successfully deleted product!', life: 3000 });
    } catch (error) {
        toast.add({ severity: 'error', summary: 'Error Message', detail: 'Something went wrong!', life: 3000 });
        console.log(error)
    }
}


onMounted(() => {
    invStore.fetchData();
})
</script>

<template>
    <h1 class="font-bold text-2xl mb-4 text-gray-800 dark:text-white">Product List</h1>
    <DataTable tableStyle="min-width: 50rem" :loading="invStore.loading" :value="invStore.data"
        v-model:filters="filters" :virtualScrollerOptions="{ itemSize: 46 }" removableSort stripedRows dataKey="id"
        :globalFilterFields="['name', 'brand', 'category']" scrollable scrollHeight="400px" filterDisplay="menu"
        stateStorage="local" stateKey="dt-state-demo-session">
        <template #header>
            <div class="flex justify-between">
                <div class="flex gap-2">
                    <Button type="button" icon="pi pi-filter-slash" label="Clear" outlined />
                    <!-- <Button icon="pi pi-external-link" label="Export Displayed" @click="exportCSV()" /> -->
                    <Button icon="pi pi-external-link" label="Export All" outlined />
                    <Button icon="pi pi-plus" label="Add Product" @click="addDialog = true" />
                </div>

                <span class="relative">
                    <i class="pi pi-search absolute top-2/4 -mt-2 left-3 text-surface-400 dark:text-surface-600" />
                    <InputText placeholder="Keyword Search" v-model="filters['global'].value"
                        class="pl-10 font-normal" />
                </span>
            </div>
        </template>
        <template #empty> No Products found... </template>
        <Column header="#" headerStyle="width: 3rem; font-weight: bold;" bodyStyle="font-weight: bold;">
            <template #body="slotProps">
                {{ slotProps.index + 1 }}
            </template>
        </Column>
        <Column field="name" sortable header="Name">
            <template #body="{ data }">
                <div class="flex items-center gap-3">
                    <img alt="item-image" :src="data.image" class="w-10 h-10 rounded-full" />
                    <span>{{ data.name }}</span>
                </div>
            </template>
        </Column>
        <Column field="brand" sortable header="Brand"></Column>
        <Column field="category" sortable header="Category"></Column>
        <Column field="price" header="Price">
            <template #body="{data}">
                <div class="flex items-center gap-1">
                    <span>₱</span>
                    <label>{{ data.price }}</label>
                </div>
            </template>
        </Column>
        <Column field="stock" header="Stocks">
            <template #body="{ data }">
                <Tag :value="data.stock === 0 ? 'out of stock' : data.stock" :severity="getSeverity(data.stock)" />
            </template>
        </Column>
        <Column header="Actions" headerClass="w-20" bodyClass="text-center">
            <template #body="{ data }">
                <i class="pi pi-ellipsis-v cursor-pointer" @click="toggle(data)"></i>
                <OverlayPanel ref="op">
                    <div
                        class="z-10 w-28 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                        <ul class="py-1 text-sm text-gray-700 dark:text-gray-200">
                            <li>
                                <a @click="editDialog = true"
                                    class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit</a>
                            </li>
                            <li>
                                <a @click="deleteProduct(data.uid)"
                                    class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Delete</a>
                            </li>
                        </ul>
                    </div>
                </OverlayPanel>
            </template>
        </Column>
    </DataTable>

    <Dialog v-model:visible="addDialog" modal header="Add Product" :style="{ width: '28rem' }" :draggable="false">
        <AddForm @result="addResult" />
    </Dialog>

    <Dialog v-model:visible="editDialog" modal header="Edit Product" :style="{ width: '28rem' }" :draggable="false">
        <EditForm :product="selectedProduct" @result="editResult" />
    </Dialog>

    <Toast />
</template>