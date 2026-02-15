import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue'
import { authService } from '@/auth/auth-service'

const routes = [
  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/tabs/tab1',
      },
      {
        path: 'tab1',
        component: () => import('@/views/Tab1Page.vue'),
      },
      {
        path: 'tab2',
        component: () => import('@/views/Tab2Page.vue'),
      },
      {
        path: 'tab3',
        component: () => import('@/views/Tab3Page.vue'),
      },
      {
        path: 'login',
        component: () => import('@/views/LoginPage.vue'),
      },
    ],
  },
  {
    path: '/',
    redirect: '/tabs/tab1',
  },
]


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})
/* 🔐 Auth Guard */
router.beforeEach(async (to) => {
  const user = await authService.getCurrentUser()

  // login แล้ว ห้ามกลับไปหน้า login
  if (to.path === '/login' && user) {
    return '/tabs/tab1'
  }

  // ถ้า route ต้อง login แต่ยังไม่มี user
  if (to.meta.requiresAuth && !user) {
    return '/login'
  }

  return true
})

export default router
