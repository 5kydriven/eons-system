import router from "./index";
import { useAuthStore } from '@/stores/AuthStore'

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();
    const isAuthenticated = authStore.isAuthenticated();
  
    if (isAuthenticated && to.name === 'signin') {
      next('/dashboard');
      return;
    }
  
    if (to.matched.some(record => record.meta.auth) && !isAuthenticated) {
      next({ name: 'signin' });
      return;
    }
  
    // Allow navigation to child routes of 'dashboard' if authenticated
    if (to.matched.some(record => record.meta.auth) && isAuthenticated) {
      next();
      return;
    }
  
    next();
  });