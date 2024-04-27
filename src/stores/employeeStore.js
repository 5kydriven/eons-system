import { defineStore } from "pinia";
import { addDoc, collection, getDocs, setDoc, doc, deleteDoc } from "firebase/firestore";
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
          id: doc.id,
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
      const res = await createUserWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      );
      const uid = res.user.uid;
      await setDoc(doc(db, "accountRoles", uid), { role: "user" });
      await setDoc(doc(db, "employee", uid), {
        name: credentials.name,
        category: credentials.category,
        email: credentials.email,
        password: credentials.password,
      });
      console.log(res.user);
    } catch (err) {
      // const errCode = err.code;
      console.log(err);
      // let errMessage;

      // switch (errCode) {
      //   case "auth/invalid-email":
      //     errMessage = "Email is invalid";
      //     break;
      //   case "auth/user-not-found":
      //     errMessage = "User is not registered.";
      //     break;
      //   case "auth/wrong-password":
      //     errMessage = "Wrong password.";
      //     break;
      //   case "auth/invalid-credential":
      //     errMessage = "Incorrect email or password";
      //     break;
      //   default:
      //     console.log(err.code);
      //     errMessage = "Unknown error";
      // }

      // return { error: true, message: errMessage };
    }
  };

  const deleteEmployee = async (uid) => {
    try {
      const res = await auth.deleteUser(uid)
      const res2 = await deleteDoc(doc(db, "accountRoles", uid))
      await deleteDoc(doc(db, "employee", uid))
      console.log(res)
      console.log(res2)
    } catch (err) {
      console.log(err)
    }
  }

  return {
    getEmployee,
    addEmployee,
    employees,
    deleteEmployee
  };
});
