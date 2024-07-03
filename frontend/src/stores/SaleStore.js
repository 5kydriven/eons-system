import { defineStore } from "pinia";
import { ref, computed } from "vue";
import {where, query, onSnapshot, orderBy } from "firebase/firestore";
import {transactionRef, productRef } from '@/composables/firebase.js'

export const useSaleStore = defineStore('saleStore', () => {
    const today = new Date();
    const totalMonthlyCostPrice = ref(0);
    const totalMonthlySellingPrice = ref(0);
    const totalProducts = ref(0)
    const totalDailySellingPrice = ref(0)
    const totalDailyCostPrice = ref(0)
    const loading = ref(false)


    const monthlyPercentage = computed(() => {
        if (totalMonthlyCostPrice.value === 0 || totalMonthlySellingPrice.value === 0) return 0
        return (totalMonthlyCostPrice.value / totalMonthlySellingPrice.value) * 100
    })

    const dailyPercentage = computed(() => {
        if (totalDailyCostPrice.value === 0 || totalDailySellingPrice.value === 0) return 0
        return (totalDailyCostPrice.value / totalDailySellingPrice.value) * 100
    })

    const monthlyProfit = computed(() => totalMonthlySellingPrice.value - totalMonthlyCostPrice.value);

    const dailyProfit = computed(() => totalDailySellingPrice.value - totalDailyCostPrice.value);

    const profitPercentage = computed(() => {
        if (totalMonthlyCostPrice.value === 0) return 0; // To avoid division by zero
        return (monthlyProfit.value / totalMonthlyCostPrice.value) * 100;
    });

    // firebase daily queries
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59);

    const dailyTransaction = query(
        transactionRef,
        where("timestamp", ">=", startOfDay),
        where("timestamp", "<=", endOfDay)
    );

    const getTotalDaily = () => {
        try {
            onSnapshot(dailyTransaction, (querySnapshot) => {
                let totalSellingPriceToday = 0;
                let totalCostPriceToday = 0;
                querySnapshot.forEach((doc) => {
                    const items = doc.data().items; // Get the items array
                    const discount = doc.data().discount;
                    if (Array.isArray(items)) {
                        items.forEach((item) => {
                            const discountedPrice = item.price * (1 - discount / 100);
                            totalSellingPriceToday += discountedPrice * item.quantity;
                            totalCostPriceToday += item.marketPrice * item.quantity;
                        });
                    }
                });
                totalDailySellingPrice.value = totalSellingPriceToday;
                totalDailyCostPrice.value = totalCostPriceToday;
            })
        } catch (error) {
            console.log("Error getting documents: ", error);
        }
    }

    // firebase Monthly queries
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    const monthlyTransaction = query(
        transactionRef,
        where("timestamp", ">=", startOfMonth),
        where("timestamp", "<=", endOfMonth)
    );

    const getTotalMonthly = () => {
        try {
            onSnapshot(monthlyTransaction, (querySnapshot) => {
                let totalCostPrice = 0;
                let totalSellingPrice = 0;
                querySnapshot.forEach((doc) => {
                    const items = doc.data().items; // Get the items array
                    const discount = doc.data().discount;
                    if (Array.isArray(items)) {
                        items.forEach((item) => {
                            const discountedPrice = item.price * (1 - discount / 100);
                            totalCostPrice += item.marketPrice * item.quantity;
                            totalSellingPrice += discountedPrice * item.quantity;
                        });
                    }
                });
                totalMonthlyCostPrice.value = totalCostPrice;
                totalMonthlySellingPrice.value = totalSellingPrice;
            })
        } catch (error) {
            console.log("Error getting documents: ", error);
        }
    }

    const getAllProducts = () => {
        onSnapshot(productRef, (querySnapshot) => {
            let sumOfProducts = 0;
            querySnapshot.forEach((doc) => {
                sumOfProducts += doc.data().stock;
            })
            totalProducts.value = sumOfProducts;
        })
    }

    const transaction = ref()

    const getAllTransaction = () => {
        loading.value = true
        const q = query(transactionRef, orderBy("timestamp", "desc"));
        try {
            onSnapshot(q, (querySnapshot) => {
                const products = [];
                querySnapshot.forEach((doc) => {
                    products.push(doc.data())
                });
                transaction.value = products
                loading.value = false
            });
        } catch (err) {
            console.error("Error storing products: ", err);
        }
    };

    return {
        getTotalMonthly,
        getTotalDaily,
        getAllProducts,
        totalMonthlyCostPrice,
        totalMonthlySellingPrice,
        monthlyPercentage,
        monthlyProfit,
        dailyProfit,
        profitPercentage,
        totalProducts,
        totalDailySellingPrice,
        totalDailyCostPrice,
        dailyPercentage,
        loading,
        getAllTransaction,
        transaction
    }
})