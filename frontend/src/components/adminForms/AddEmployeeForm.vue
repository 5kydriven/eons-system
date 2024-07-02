<script setup>
import { ref } from 'vue';
import { doc, setDoc } from "firebase/firestore";
import { db } from '@/stores/firebase';

const emit = defineEmits(['result'])

const employee = ref({
    name: "",
    email: "",
    password: "",
    category: ""
})

const position = ref([
    { name: 'Cashier' },
]);

const loading = ref(false)

const addEmployee = async (data) => {
    loading.value = true
    try {
        const response = await fetch('http://localhost:8080/createUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Set content type to JSON
            },
            body: JSON.stringify(data) // Convert data to JSON string
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const result = await response.json();


        await setDoc(doc(db, "employee", result.uid), {
            category: data.category.name,
            name: data.name,
            email: data.email,
        });

        await setDoc(doc(db, "accountRoles", result.uid), {
            role: 'user'
        });

        emit('result', 'success')
    } catch (error) {
        emit('result', 'error')
        console.log(error);
    }
    loading.value = false
}
</script>

<template>
    <div class="grid grid-cols-2 gap-y-2 mb-5">
        <div>
            <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
            <InputText type="text" v-model="employee.name" placeholder="Juan Carlos" />
        </div>
        <div class="flex flex-col">
            <label for="Postion" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Position</label>
            <Dropdown v-model="employee.category" :options="position" optionLabel="name" placeholder="Select a position"
                inputClass="w-full" />
        </div>
        <div>
            <label for="Username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
            <InputText type="email" v-model="employee.email" placeholder="sample@gmail.com" />
        </div>
        <div>
            <label for="Password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
            <Password v-model="employee.password" toggleMask :feedback="false" inputClass="w-full"
                placeholder="••••••••" />
        </div>
    </div>
    <div class="flex justify-end">
        <Button label="add" icon="pi pi-plus" @click="addEmployee(employee)" :loading="loading" />
    </div>
</template>