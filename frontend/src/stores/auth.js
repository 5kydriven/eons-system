import { defineStore } from "pinia";
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { useFirebaseAuth } from 'vuefire';
import { ref } from 'vue';
import { doc, getDoc } from "firebase/firestore";
import { db } from '@/composables/firebase'; // Adjust the import according to your project structure
import { useRouter } from 'vue-router';

export const useAuthStore = defineStore("authStore", () => {
    const auth = useFirebaseAuth();
    const router = useRouter();

    const user = ref(null);
    const authLoading = ref(false);
    const role = ref(null);
    const message = ref(null);

    const handleAuthState = () => {
        onAuthStateChanged(auth, async (userDetails) => {
            if (userDetails) {
                user.value = userDetails;
                try {
                    const docSnap = await getDoc(doc(db, "accountRoles", userDetails.uid));
                    role.value = docSnap.exists() ? docSnap.data().role : null;
                    // Redirect based on role
                    if (role.value === 'admin') {
                        router.push('/dashboard');
                    } else if (role.value === 'user') {
                        router.push('/pos');
                    } else {
                        router.push('/')
                    }
                } catch (err) {
                    console.error("Error fetching role:", err);
                }
            } else {
                user.value = null;
                role.value = null;
            }
            authLoading.value = false;
        });
    };

    const loginUser = async (credentials) => {
        authLoading.value = true;
        try {
            const userData = await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
            user.value = userData;
        } catch (err) {
            getErrorMessage(err.code);
            authLoading.value = false;
        } 
    };

    const getErrorMessage = (errorCode) => {
        const errorMessages = {
            "auth/invalid-email": "Input email and password!",
            "auth/user-not-found": "User is not registered.",
            "auth/wrong-password": "Wrong password.",
            "auth/invalid-credential": "Incorrect email or password"
        };
        message.value = errorMessages[errorCode] || "Unknown error";
    };

    const logoutUser = async () => {
        try {
            await signOut(auth);
            user.value = null;
            role.value = null;
            message.value = null;
            console.log("User logged out successfully");
            router.push('/')
        } catch (err) {
            console.error("Error logging out:", err);
        }
    };

    return {
        loginUser,
        user,
        authLoading,
        role,
        message,
        logoutUser,
        handleAuthState
    };
});
