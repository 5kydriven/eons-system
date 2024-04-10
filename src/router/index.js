import { createRouter, createWebHistory } from 'vue-router'
import SigninView from '../views/SigninView.vue'
import MainPage from '../views/MainPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'signin',
      component: SigninView
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: MainPage
    },
  ]
})

export default router
