import { defineStore } from "pinia";
import { auth } from "./firebase";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { ref } from 'vue';

export const useAuthStore = defineStore("authStore", () => {
    const user = ref();
    const isLoading = ref(false);
    const role = ref();

    const loginUser = async (credentials) => {
        // isLoading.value = true;
        try {
            const { user } = await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
            user.value = user
        } catch (err) {
            return getErrorMessage(err.code);
        }
        // isLoading.value = false;
    };

    const getErrorMessage = (errorCode) => {
        let errorMessage;
        switch (errorCode) {
            case "auth/invalid-email":
                errorMessage = "Email is invalid";
                break;
            case "auth/user-not-found":
                errorMessage = "User is not registered.";
                break;
            case "auth/wrong-password":
                errorMessage = "Wrong password.";
                break;
            case "auth/invalid-credential":
                errorMessage = "Incorrect email or password";
                break;
            default:
                errorMessage = "Unknown error";
        }
        return { error: true, message: errorMessage };
    };

    const logoutUser = async () => {
        try {
            await signOut(auth);
            console.log("User logged out successfully");
        } catch (err) {
            console.error("Error logging out:", err);
        }

    };

    return {
        loginUser,
        user,
        isLoading,
        logoutUser,
    };
});