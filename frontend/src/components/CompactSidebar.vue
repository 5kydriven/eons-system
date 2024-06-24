<template>
  <div class="sidebar fixed z-50 bg-white w-[3.35rem] overflow-hidden border-r hover:w-56 hover:shadow-lg">
    <div class="flex h-screen flex-col justify-between pt-2 pb-6">
      <div>
        <div class="w-max relative flex items-center space-x-5 p-2 py-3">
          <img src="/logo.svg" class="w-10" alt="">
          <span class="text-2xl font-bold text-gray-600">EON's</span>
        </div>
        <ul class="mt-6 space-y-2 tracking-wide">
          <li class="min-w-max">
            <a
              class="relative flex items-center space-x-5 px-4 py-3 bg-gray-600 text-white cursor-pointer">
              <span class="material-symbols-outlined">
                dashboard
              </span>
              <span class="-mr-1 font-medium">Dashboard</span>
            </a>
          </li>
        </ul>
      </div>
      <div class="w-full -mb-3">
        <a
          class="group cursor-pointer flex items-center space-x-5 px-4 py-3 hover:bg-gray-600 hover:text-white text-gray-700">
          <span class="material-symbols-outlined font-medium">
            logout
          </span>
          <span class="font-medium">Logout</span>
        </a>
      </div>
    </div>
  </div>
</template>
