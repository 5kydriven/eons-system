import { defineStore } from "pinia";
import { db } from "./firebase";
import { ref } from "vue";
import { collection, getDocs, where, onSnapshot, deleteDoc, doc } from "firebase/firestore";

export const useInventoryStore = defineStore('invetoryStore', () => {
    const data = ref([])
    const cart = ref([])
    const employee = ref([])
    const loading = ref(false)

    const fetchData = () => {
        // const q = query(collection(db, "cities"), where("state", "==", "CA"));
        onSnapshot(collection(db, "products"), (querySnapshot) => {
            const products = [];
            querySnapshot.forEach((doc) => {
                products.push({ ...doc.data(), uid: doc.id });
            });
            data.value = products;
            loading.value = false
        });
    }

    const getEmployeeData = () => {
        onSnapshot(collection(db, "employee"), (querySnapshot) => {
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