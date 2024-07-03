import { createRouter, createWebHistory } from 'vue-router'
import { getCurrentUser } from 'vuefire'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'auth',
      component: () => import('@/pages/index.vue'),
      meta: {
        title: "EON's"
      }
    },
    {
      path: '/dashboard',
      name: 'home',
      component: () => import('@/pages/admin/index.vue'),
      children: [
        {
          path: '',
          name: 'dashboard',
          component: () => import('@/pages/admin/Dashboard.vue')
        },
        {
          path: '/inventory-list',
          name: 'inventory',
          component: () => import('@/pages/admin/Inventory.vue')
        },
        {
          path: '/employee-list',
          name: 'employee',
          component: () => import('@/pages/admin/Employee.vue')
        },
        {
          path: '/sales-report',
          name: 'sales',
          component: () => import('@/pages/admin/Sales.vue')
        },
      ],
      meta: {
        role: 'admin',
        isAuthenticated: true
      }
    },
    {
      path: '/pos',
      name: 'pos',
      component: () => import('@/pages/employee/index.vue'),
      meta: {
        role: 'user',
        isAuthenticated: true
      }
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const user = await getCurrentUser();
  const authStore = useAuthStore();

  if (to.meta.isAuthenticated) {
    if (!user) {
      // Redirect to login page if not authenticated
      next({ name: 'auth' });
    } else if (to.meta.role && to.meta.role !== authStore.role) {
      // Redirect to the appropriate dashboard based on role
      if (authStore.role === 'admin') {
        next({ name: 'dashboard' });
      } else if (authStore.role === 'user') {
        next({ name: 'pos' });
      } else {
        // Redirect to a default page if role is not matched
        next({ name: 'auth' });
      }
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
