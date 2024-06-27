<script setup>
import { ref, onMounted, watch } from 'vue';
import { doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, uploadBytes, ref as storageRef } from 'firebase/storage';
import { db, storage } from '@/stores/firebase';

const props = defineProps({
    product: Object
});

const emit = defineEmits(['result'])

const loading = ref(false)

let file;
let path;

const product = ref(props.product);

const updateProduct = async () => {
    try {
        loading.value = true;

        if (file) {
            const storageReference = storageRef(storage, path);

            await uploadBytes(storageReference, file);
            console.log("added image");

            const url = await getDownloadURL(storageReference);
            product.value.image = url;
        }

        await updateDoc(doc(db, "products", product.value.uid), product.value);

        emit('result', 'success')
    } catch (error) {
        emit('result', 'error')
        console.log(error)
    } finally {
        loading.value = false;
    }
};


const onFileChange = (event) => {
    file = event.target.files[0];
    path = 'productPicture/' + file.name;
};

watch(() => props.productData, (newValue) => {
    product.value = newValue;
});
</script>

<template>
    <form>
        <div class="grid gap-4 mb-4 grid-cols-2">
            <div class="col-span-2 sm:col-span-1">
                <label for="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                <input type="text" name="name" id="name" v-model="product.name"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="e.g suzuki">
            </div>
            <div class="col-span-2 sm:col-span-1">
                <label for="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Brand</label>
                <input type="text" name="brand" id="brand" v-model="product.brand"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="e.g suzuki">
            </div>
            <div class="col-span-2 sm:col-span-1">
                <label for="category"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                <select id="category" v-model="product.category"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                    <option selected>{{ product.category }}</option>
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
                <input type="number" name="price" id="price" v-model="product.price"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="$2999">
            </div>
            <div class="col-span-2 sm:col-span-1">
                <label for="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Stock</label>
                <input type="number" name="Stock" id="Stock" v-model="product.stock"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="99">
            </div>
            <div class="col-span-2 sm:col-span-1">
                <label for="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cost
                    Price</label>
                <input type="number" name="market price" id="market price" v-model="product.marketPrice"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="P 1000">
            </div>
            <div class="sm:col-span-2">
                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="user_avatar">Upload
                    picture</label>
                <input @change="onFileChange"
                    class="block w-full text-sm text-gray-900 border p-1 border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    aria-describedby="user_avatar_help" id="user_avatar" type="file">
                <div class="mt-1 text-sm text-gray-500 dark:text-gray-300" id="user_avatar_help">A product
                    picture is useful to easily identify but it is not mandatory</div>
            </div>
        </div>
        <div class="flex items-center justify-end">
            <Button @click="updateProduct" label="Update" icon="pi pi-pen-to-square" :loading="loading" />
        </div>
    </form>
</template>