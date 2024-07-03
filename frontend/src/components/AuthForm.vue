<script setup>
import { useAuthStore } from "@/stores/auth";
import { reactive, ref } from "vue";

const authStore = useAuthStore();

const credentials = reactive({
    email: "",
    password: "",
});

const errorMessage = ref(null);
const isError = ref(false)

const validateForm = () => {
    if (!credentials.email || !credentials.password) {
        errorMessage.value = "All fields are required.";
        isError.value = true
        return false;
    }
    console.log('click')
    return true;
};

const handleSubmit = () => {
    if (validateForm()) {
        authStore.loginUser(credentials);
    }
};
</script>

<template>
    <form class="flex flex-col gap-4" @submit.prevent="handleSubmit">
        <div v-if="errorMessage"
            class="flex items-center justify-center font-semibold p-2 mb-2 text-sm text-red-700 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
            role="alert">
            <div>{{ errorMessage }}</div>
        </div>
        <div v-if="authStore.message"
            class="flex items-center justify-center font-semibold p-2 mb-2 text-sm text-red-700 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
            role="alert">
            <div>{{ authStore.message }}</div>
        </div>
        <div>
            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
            <InputText type="email" v-model="credentials.email" class="w-full" :invalid="isError"/>
            <small v-show="isError" class="text-red-700">Please input your email.</small>
        </div>
        <div class="mb-4">
            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
            <InputText type="password" v-model="credentials.password" class="w-full" :invalid="isError"/>
            <small v-show="isError" class="text-red-700">Please input your password.</small>
        </div>
        <Button type="submit" label="Sign In" class="w-full" :loading="authStore.authLoading" />
    </form>
</template>
