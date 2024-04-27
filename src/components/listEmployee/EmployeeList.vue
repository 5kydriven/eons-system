<script setup>
import { ref } from "vue"
defineProps({
    uid: String,
    name: String,
    category: String,
    email: String,
    password: String,
    index: Number
})
// const showPassword = ref(Array(employeeLength).fill(false));
const showPassword = ref(false)
function toglePass() {
    showPassword.value = !showPassword.value
}
// const isClicked = (index) => {
//     showPassword.value[index] = !showPassword.value[index] || false;
// };

</script>

<template>
    <tr class="border-b dark:border-gray-700">
        <td scope="row" class="px-4 py-3 text-gray-900 whitespace-nowrap dark:text-white">
            {{ name }}
        </td>
        <td class="px-4 py-3">{{ category }}</td>
        <td class="px-4 py-3">{{ email }}</td>
        <td class="px-4 py-3">
            <div class="relative">
                <!-- Conditional rendering of password -->
                <label v-if="!showPassword">
                    ••••••••
                </label>
                <label v-else>
                    {{ password }}
                </label>
                <!-- Toggle icon -->
                <span type="button" class="cursor-pointer absolute right-10" @click="toglePass">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor"
                        :class="{ 'text-gray-500': !showPassword, 'text-blue-500': showPassword }"
                        class="w-6 h-6 hover:text-blue-300">
                        <path v-if="!showPassword" strokeLinecap="round" strokeLinejoin="round"
                            d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                        <path v-else strokeLinecap="round" strokeLinejoin="round"
                            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                    </svg>
                </span>
            </div>
        </td>

        <td class="px-4 py-3 flex items-center justify-center">
            <button :id="'dropdown-button-' + index " :data-dropdown-toggle="'dropdown-' + index "
                class="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100"
                type="button">
                <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewbox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                </svg>
            </button>
            <div :id="'dropdown-' +  index "
                class="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                <ul class="py-1 text-sm text-gray-700 dark:text-gray-200"
                    :aria-labelledby="'dropdown-button-' +  index ">
                    <li>
                        <a
                            class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit</a>
                    </li>
                    <li>
                        <a
                            class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer" @click="$emit('deleteEmployee', uid )">Delete</a>
                    </li>
                </ul>
            </div>
        </td>
    </tr>
</template>
