<script setup>
import AuthForm from '@/components/AuthForm.vue';
</script>

<template>
  <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 ">
    <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
      <img class="h-12 md:h-20 rounded-full shadow-md mr-2" src="/logo.svg" alt="logo" />
      EON's
    </a>
    <div
      class="w-full bg-white rounded-lg shadow-md dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
      <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Sign in to your account
        </h1>

        <AuthForm />
      </div>
    </div>
  </div>
</template>