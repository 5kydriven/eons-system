import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { doc, getDoc, serverTimestamp, updateDoc, collection, addDoc } from "firebase/firestore";
import { db } from '@/stores/firebase.js'
import { useInventoryStore } from "./InventoryStore";

const invStore = useInventoryStore()


export const usePosStore = defineStore('posStore', () => {
    const cart = ref([]);
    const discount = ref(0);
    const money = ref(0);
    const isLoading = ref(false);
    const errorMessage = ref('');
    const originalStock = {};

    const addToCart = (info) => {
        let found = cart.value.find(item => item.uid === info.uid);
        if (found) {
            if (found.quantity >= 0) {
                found.quantity++;
                info.stock--;
                console.log("1info: " + info.stock);
                console.log("1cart: " + found.quantity)
            }
        } else {
            originalStock[info.uid] = info.stock;
            console.log("click")
            console.log(cart.value)
            if (found) {
                found.quantity++;
                info.stock--;
            } else {
                info.quantity = 1;
                cart.value.push(info);
                info.stock--;
                console.log("2info: " + info.stock);
            }
        }

    }

    const decrementCartQuantity = (uid) => {
        let found = cart.value.find(item => item.uid === uid);
        let invItem = invStore.data.find(item => item.uid === uid);
        if (found && invItem) {
            found.quantity--;
            invItem.stock++;
        }
    }

    const incrementCartQuantity = (uid) => {
        let found = cart.value.find(item => item.uid === uid);
        let invItem = invStore.data.find(item => item.uid === uid);
        if (invItem.stock > 0) {
            found.quantity++;
            invItem.stock--;
        }
    }

    const clearCart = () => {
        console.log('clear')
        cart.value.forEach(item => {
            // Restore original stock value for each item in the cart
            if (originalStock[item.uid] !== undefined) {
                const invItem = invStore.data.find(invItem => invItem.uid === item.uid);
                if (invItem) {
                    invItem.stock = originalStock[item.uid];
                }
            }
        });
        cart.value = [];
        errorMessage.value = '';
        money.value = 0;
        discount.value = 0;
        console.log(cart.value)
    }

    const totalQuantity = computed(() => {
        let total = 0;
        for (let item of cart.value) {
            total += item.quantity;
        }
        return total;
    });

    const totalAmount = computed(() => {
        let total = 0;
        for (let item of cart.value) {
            total += (item.price * item.quantity);
        }
        return total - (total * discount.value / 100);
    });

    const changed = computed(() => {
        if (money.value > 0) {
            return money.value - totalAmount.value;
        } else {
            return money.value
        }
    });

    const isCartEmpty = computed(() => cart.value.length === 0);

    const payNow = async () => {
        if (!validateMoney()) {
            return;
        }
        try {
            isLoading.value = true

            const counterDoc = await doc(db, "idCounter", "counter");
            const counterSnapshot = await getDoc(counterDoc);
            let currentCounter = counterSnapshot.data().value;

            // Generate custom ID for the transaction
            const transactionId = String(currentCounter).padStart(8, '0');

            const transaction = {
                id: transactionId,
                timestamp: serverTimestamp(),
                items: cart.value,
                totalAmount: totalAmount.value,
                money: money.value,
                discount: discount.value,
            };

            // Update product inventory
            for (const item of cart.value) {
                const productRef = doc(db, 'products', item.uid);
                await updateDoc(productRef, {
                    stock: item.stock
                });
            }

            // Increment counter value in Firestore
            currentCounter++;
            await updateDoc(counterDoc, { value: currentCounter });

            // Add transaction to Firestore
            await addDoc(collection(db, "transactions"), transaction);

            cart.value = []
            errorMessage.value = '';
            money.value = 0;
            discount.value = 0;
            isLoading.value = false
        } catch (err) {
            console.log(err)
        }
        console.log("click")
    }

    const validateMoney = () => {
        if (money.value == 0) {
            errorMessage.value = 'Invalid Cash Amount';
            return false;
        } else if (money.value < totalAmount.value) {
            errorMessage.value = 'Insufficient Cash';
            return false;
        } else {
            errorMessage.value = '';
            return true;
        }
    };

    return {
        cart,
        addToCart,
        decrementCartQuantity,
        incrementCartQuantity,
        totalQuantity,
        totalAmount,
        clearCart,
        discount,
        changed,
        money,
        payNow,
        isLoading,
        isCartEmpty,
        errorMessage,
        validateMoney
    }
})