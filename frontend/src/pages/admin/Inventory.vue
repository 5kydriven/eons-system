<script setup>
import { ref, onMounted } from 'vue'
import { useInventoryStore } from '@/stores/InventoryStore';
import { FilterMatchMode, FilterOperator } from 'primevue/api';

const invStore = useInventoryStore();

const filters = ref();
const op = ref();
const dialog = ref(false);

const product = ref({
    name: "",
    brand: "",
    category: "",
    price: 0,
    stock: 0,
    marketPrice: 0,
    image: ""
})

const toggle = (event) => {
    op.value.toggle(event);
}

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

onMounted(() => {
    invStore.loading = true
    invStore.fetchData();
})
</script>
<template>
    <h1 class="font-bold text-2xl mb-4 text-gray-800 dark:text-white">Product List</h1>
    <DataTable tableStyle="min-width: 50rem" :loading="invStore.loading" :value="invStore.data"
        v-model:filters="filters" :virtualScrollerOptions="{ itemSize: 46 }" removableSort stripedRows dataKey="id"
        :globalFilterFields="['name', 'brand', 'category']" scrollable scrollHeight="400px" filterDisplay="menu">
        <template #header>
            <div class="flex justify-between">
                <div class="flex gap-2">
                    <Button type="button" icon="pi pi-filter-slash" label="Clear" outlined />
                    <!-- <Button icon="pi pi-external-link" label="Export Displayed" @click="exportCSV()" /> -->
                    <Button icon="pi pi-external-link" label="Export All" outlined />
                    <Button icon="pi pi-plus" label="Add Product" @click="dialog = true" />
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
        <Column field="price" header="Price"></Column>
        <Column field="stock" header="Stocks">
            <template #body="{ data }">
                <Tag :value="data.stock === 0 ? 'out of stock' : data.stock" :severity="getSeverity(data.stock)" />
            </template>
        </Column>
        <Column header="Actions" headerClass="w-20" bodyClass="text-center">
            <template #body="{ data }">
                <i class="pi pi-ellipsis-v cursor-pointer" @click="toggle"></i>
                <OverlayPanel ref="op">
                    <div
                        class="z-10 w-28 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                        <ul class="py-1 text-sm text-gray-700 dark:text-gray-200">
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
                </OverlayPanel>
            </template>
        </Column>
    </DataTable>

    <Dialog v-model:visible="dialog" modal header="Add Product" :style="{ width: '28rem' }" :draggable="false">
        <form @submit.prevent="addProduct(product)">
            <div class="grid gap-4 mb-4 grid-cols-2">
                <div class="col-span-2 sm:col-span-1">
                    <label for="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">name</label>
                    <input required v-model="product.name" type="text" name="name" id="name"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="e.g suzuki">
                </div>
                <div class="col-span-2 sm:col-span-1">
                    <label for="price"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Brand</label>
                    <input required v-model="product.brand" type="text" name="brand" id="brand"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="e.g suzuki">
                </div>
                <div class="col-span-2 sm:col-span-1">
                    <label for="category"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                    <select required v-model="product.category" id="category"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                        <option value="Engine">Engine</option>
                        <option value="Transmissions">Transmissions</option>
                        <option value="Final Drive">Final Drive</option>
                        <option value="Wheel/Tires">Wheel/Tires</option>
                        <option value="Body Panels">Body Panels</option>
                        <option value="Mudguards">Mudguards</option>
                        <option value="Lights">Lights</option>
                        <option value="Handlebars">Handlebars</option>
                        <option value="Footpegs">Footpegs</option>
                        <option value="Brakes">Brakes</option>
                        <option value="Exhausts">Exhausts</option>
                        <option value="Oils">Oils</option>
                        <option value="Accessories">Accessories</option>
                    </select>
                </div>
                <div class="col-span-2 sm:col-span-1">
                    <label for="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Selling
                        Price</label>
                    <input required v-model="product.price" type="number" name="price" id="price"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="$2999">
                </div>
                <div class="col-span-2 sm:col-span-1">
                    <label for="price"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Stock</label>
                    <input required v-model="product.stock" type="number" name="Stock" id="Stock"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="99">
                </div>
                <div class="col-span-2 sm:col-span-1">
                    <label for="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cost
                        Price</label>
                    <input required v-model="product.marketPrice" type="number" name="market price" id="market price"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="P 1000">
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
            <div class="w-full flex justify-end">
                <Button label="Add" icon="pi pi-plus" />
            </div>
        </form>
    </Dialog>
</template>