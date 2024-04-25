import { defineStore } from "pinia";
import { collection, getDocs } from "firebase/firestore";
import { db, auth } from "./firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { onMounted, ref, reactive } from "vue";

export const useEmployeeStore = defineStore("employee", () => {
    const employees = ref([]);

    const getEmployee = async () => {
      // Check if employees array is already populated
      if (employees.value.length === 0) {
          const querySnapshot = await getDocs(collection(db, "employee"));
          querySnapshot.forEach((doc) => {
            let employee = {
              name: doc.data().name,
              email: doc.data().email,
              password: doc.data().password,
              category: doc.data().category,
            };
            employees.value.push(employee);
          });
      }
  };
  

    const addEmployee = async (credentials) => {
      try {
        const res = await createUserWithEmailAndPassword(auth, credentials.email, credentials.password);
        
        console.log(res)
      } catch (err) {

      }
    }

    return {
      getEmployee,
      addEmployee,
      employees
    }
});
