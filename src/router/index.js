import { createRouter, createWebHistory } from 'vue-router'

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
      path: '/pos',
      name: 'pos',
      component: () => import('@/views/PosView.vue'),
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


export default router