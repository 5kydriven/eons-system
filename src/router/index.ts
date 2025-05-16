import { createRouter, createWebHistory } from 'vue-router'
import Auth from '../pages/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/auth' },
    {
      path: '/auth',
      name: 'auth',
      component: Auth,
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('@/pages/admin/index.vue'),
      children: [
        {
          path: 'dashboard',
          name: 'admin-dashboard',
          component: () => import('@/pages/admin/dashboard/index.vue'),
        },
        {
          path: 'staff',
          name: 'admin-staff',
          component: () => import('@/pages/admin/staff/index.vue'),
        },
        {
          path: 'inventory',
          name: 'admin-inventory',
          component: () => import('@/pages/admin/inventory/index.vue'),
        },
        {
          path: 'sales-report',
          name: 'admin-sales-report',
          component: () => import('@/pages/admin/sales-report/index.vue'),
        },
      ],
    },
    {
      path: '/staff',
      name: 'staff',
      component: () => import('@/pages/staff/index.vue'),
    },
  ],
})

export default router
