import { App } from 'vue'
import { createRouter, createWebHashHistory, RouteRecordRaw, Router } from 'vue-router'
import BasicLayout from '@/layouts/BasicLayout.vue'
import { createRouterGuards } from './routerGuards'
import { main } from './modules/main'

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'BasicLayout',
    component: BasicLayout,
    redirect: '/login',
    children: [...main]
  },
  {
    path: '/detail/:id',
    name: 'Detail',
    meta: { title: '详情' },
    props: true,
    component: () => import('@/views/detail')
  },
  {
    path: '/login',
    name: 'Login',
    meta: { title: '登录' },
    component: () => import('@/views/Login/index.vue')
  }
]

const router: Router = createRouter({
  history: createWebHashHistory(),
  routes
})

export function setupRouter(app: App) {
  app.use(router)
  // 创建路由守卫
  createRouterGuards(router)
}
export default router
