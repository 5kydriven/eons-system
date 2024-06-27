<script setup>
import { onMounted, ref } from 'vue'
import { collection, addDoc } from 'firebase/firestore'
import { db, storage } from '@/stores/firebase.js'
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";

const emit = defineEmits(['result'])

const product = ref({
    name: "",
    brand: "",
    category: "",
    price: 0,
    stock: 0,
    marketPrice: 0,
    image: ""
})

const loading = ref(false)

let file;
let path;

const addProduct = async (p) => {
    loading.value = true;
    try {
        const storageReference = file ? storageRef(storage, path) : storageRef(storage, 'productPicture/default.png');

        const url = await getDownloadURL(storageReference);
        product.value.image = url;

        await addDoc(collection(db, "products"), p);

        if (file) {
            await uploadBytes(storageReference, file);
            console.log("added image");
        }

        emit('result', 'success')
    } catch (err) {
        emit('result', 'error')
        console.log(err);
    } finally {
        loading.value = false;
    }
};

const detectImage = (e) => {
    file = e.target.files[0];
    product.value.image = file.name;
    path = 'productPicture/' + file.name;
}

</script>

<template>
    <form>
        <div class="grid gap-4 mb-4 grid-cols-2">
            <div class="col-span-2 sm:col-span-1">
                <label for="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                <input required v-model="product.name" type="text" name="name" id="name"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="e.g suzuki">
            </div>
            <div class="col-span-2 sm:col-span-1">
                <label for="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Brand</label>
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
                <label for="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Stock</label>
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
            <Button @click="addProduct(product)" label="Add" icon="pi pi-plus" :loading="loading" />
        </div>
    </form>
</template>