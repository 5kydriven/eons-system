import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { defineStore } from "pinia";
import { auth } from "./firebase";
import { ref } from "vue";

export const useAuthStore = defineStore("authStore", () => {
  const user = ref({});

  const init = () => {
    onAuthStateChanged(auth, (userDetails) => {
      console.log("state changed");
      if (userDetails) {
        const uid = userDetails.uid;
        user.value = {
          email: userDetails.email,
          uid,
        };
      } else {
        user.value = {};
      }
    });
  };

  const registerUser = (credentials) => {};

  const loginUser = (credentials) => {
    signInWithEmailAndPassword(auth, credentials.email, credentials.password)
      .then((userCredentials) => {
        const user = userCredentials.user;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const logoutUser = () => {
    signOut(auth)
      .then(() => {})
      .catch((err) => {});
  };

  return {
    registerUser,
    loginUser,
    logoutUser,
    init,
    user,
  };
});
