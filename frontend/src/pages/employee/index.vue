<template>
    <div class="min-h-screen flex flex-col md:flex-row relative">
        <!-- Sidebar -->
        <div class="sidebar bg-white p-5 shadow">
            <div class="flex flex-col space-y-4">
                <div class="sidebar-content">
                    <button class="p-2 bg-blue-600 text-white rounded w-full">Home</button>
                    <button class="p-2 bg-gray-200 rounded w-full">Orders</button>
                    <button class="p-2 bg-gray-200 rounded w-full">Settings</button>
                    <button class="p-2 bg-gray-200 rounded w-full">Logout</button>
                </div>
            </div>
        </div>

        <!-- Main Content -->
        <div class="main-content w-full md:w-4/5 p-5">
            <div class="flex justify-between items-center mb-5">
                <h1 class="text-2xl font-bold">Making Orders</h1>
                <div class="flex space-x-2">
                    <input type="text" placeholder="Search here..." class="p-2 border rounded" />
                    <button class="p-2 bg-blue-600 text-white rounded">Filter</button>
                </div>
            </div>

            <!-- Categories -->
            <div class="mb-5">
                <div class="flex flex-wrap gap-2">
                    <button class="p-2 bg-gray-200 rounded">All</button>
                    <button class="p-2 bg-gray-200 rounded">Phone</button>
                    <button class="p-2 bg-gray-200 rounded">Laptop</button>
                    <button class="p-2 bg-gray-200 rounded">Tablet</button>
                    <button class="p-2 bg-gray-200 rounded">Camera</button>
                    <button class="p-2 bg-gray-200 rounded">Mouse</button>
                    <button class="p-2 bg-gray-200 rounded">Monitor</button>
                    <button class="p-2 bg-gray-200 rounded">Keyboard</button>
                    <button class="p-2 bg-gray-200 rounded">Drone</button>
                    <button class="p-2 bg-gray-200 rounded">Accessories</button>
                </div>
            </div>

            <!-- Product Grid -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <!-- Product Card -->
                <div class="bg-white p-4 shadow rounded">
                    <img src="/package.png" alt="Laptop Gaming" class="h-32 w-full object-cover mb-2">
                    <h2 class="text-lg font-bold">Laptop Gaming</h2>
                    <p class="text-blue-600">$1.261K</p>
                </div>
                <!-- Repeat for other products -->
                <div class="bg-white p-4 shadow rounded">
                    <img src="/package.png" alt="Drone Mavic Pro" class="h-32 w-full object-cover mb-2">
                    <h2 class="text-lg font-bold">Drone Mavic Pro</h2>
                    <p class="text-blue-600">$1.036K</p>
                </div>
                <!-- Add more product cards as needed -->
            </div>
        </div>

        <!-- Detail Items Section -->
        <div class="w-full md:w-1/5 bg-white p-5 shadow mt-5 md:mt-0">
            <h2 class="text-xl font-bold mb-5">Detail Items</h2>
            <div class="space-y-4">
                <!-- Detail Item -->
                <div class="flex justify-between items-center">
                    <img src="/package.png" alt="ROG Phone" class="h-12 w-12 object-cover">
                    <div>
                        <h3 class="font-bold">ROG Phone</h3>
                        <p class="text-sm text-gray-600">Category: Phone</p>
                        <p class="text-sm text-gray-600">Brand: ROG</p>
                    </div>
                    <p class="text-blue-600">$129K</p>
                </div>
                <!-- Repeat for other items -->
            </div>

            <div class="mt-5">
                <div class="flex justify-between">
                    <span>Item</span>
                    <span>3 (Items)</span>
                </div>
                <div class="flex justify-between">
                    <span>Subtotal</span>
                    <span>$311.5K</span>
                </div>
                <div class="flex justify-between">
                    <span>Fees</span>
                    <span>$20K</span>
                </div>
                <div class="flex justify-between font-bold">
                    <span>Total</span>
                    <span>$331.5K</span>
                </div>
                <button class="w-full p-2 bg-blue-600 text-white rounded mt-4">Pay Now</button>
                <button class="w-full p-2 bg-gray-200 rounded mt-2">Cancel</button>
            </div>
        </div>
    </div>
</template>

<style>
.sidebar {
    width: 64px;
    transition: width 0.3s;
    position: absolute;
    height: 100%;
    z-index: 10;
}

.sidebar:hover {
    width: 256px;
}

.sidebar-content {
    opacity: 0;
    transition: opacity 0.3s;
}

.sidebar:hover .sidebar-content {
    opacity: 1;
}

.main-content {
    margin-left: 64px;
    transition: margin-left 0.3s;
}

.sidebar:hover+.main-content {
    margin-left: 256px;
}
</style>