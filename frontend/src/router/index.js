import { createRouter, createWebHistory } from 'vue-router'
import AuthPage from '@/pages/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'auth',
      component: AuthPage
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
      ]
    },
    {
      path: '/pos',
      name: 'pos',
      component: () => import('@/pages/employee/index.vue')
    }
  ]
})

export default router
