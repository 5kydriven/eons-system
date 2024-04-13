import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/AuthStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'signin',
      component: () => import('@/views/SigninView.vue'),
      meta: {
        auth: false
      }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/views/MainPage.vue'),
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('@/components/pages/DashboardPage.vue'),
        },
        {
          path: '/sales-report',
          name: 'sales',
          component: () => import('@/components/pages/SalesReportPage.vue'),
        },
        {
          path: '/inventory',
          name: 'inventory',
          component: () => import('@/components/pages/InventoryPage.vue'),
        },
        {
          path: '/employee',
          name: 'employee',
          component: () => import('@/components/pages/EmployeePage.vue'),
        },
      ],
      meta: {
        auth: true
      }
    },
  ]
})



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

export default router