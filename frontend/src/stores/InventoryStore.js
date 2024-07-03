import { defineStore } from "pinia";
import { db, productRef, employeeRef } from "@/composables/firebase.js";
import { ref } from "vue";
import { onSnapshot, deleteDoc, doc } from "firebase/firestore";

export const useInventoryStore = defineStore('invetoryStore', () => {
    const data = ref([])
    const cart = ref([])
    const employee = ref([])
    const loading = ref(false)

    const fetchData = () => {
        loading.value = true
        // const q = query(collection(db, "cities"), where("state", "==", "CA"));
        onSnapshot(productRef, (querySnapshot) => {
            const products = [];
            querySnapshot.forEach((doc) => {
                products.push({ ...doc.data(), uid: doc.id });
            });
            data.value = products;
            loading.value = false
        });
    }

    const getEmployeeData = () => {
        loading.value = true
        onSnapshot(employeeRef, (querySnapshot) => {
            const e = [];
            querySnapshot.forEach((doc) => {
                e.push({ ...doc.data(), uid: doc.id });
            });
            employee.value = e;
            loading.value = false
        });
    }

    const deleteProduct = async (uid) => {
        try {
            await deleteDoc(doc(db, "products", uid));
            console.log("deleted");
        } catch (err) {
            console.log(err);
        }
    }

    

    return {
        fetchData,
        data,
        deleteProduct,
        cart,
        loading,
        getEmployeeData,
        employee
    }
});