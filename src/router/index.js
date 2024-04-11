import { createRouter, createWebHistory } from 'vue-router'
import SigninView from '../views/SigninView.vue'
import MainPage from '../views/MainPage.vue'
import { useAuthStore } from '@/stores/AuthStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'signin',
      component: SigninView,
      meta: {
        auth: false
      }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: MainPage,
      meta: {
        auth: true
      }
    },
  ]
})


router.beforeEach((to, from, next) => {
  const authStore = useAuthStore(); // Access the authStore instance
  const { isAuthenticated, user } = authStore;

  if (to.meta.auth && !isAuthenticated) {
    next({ name: 'signin' });
  } else if (user.uid && to.name === 'signin') {
    next({ name: 'dashboard' });
  } else {
    next();
  }
});

export default router