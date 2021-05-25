/* eslint-disable import/prefer-default-export */
import { Router } from 'vue-router'
// import { store } from '@/store'

export function createRouterGuards(router: Router) {
  router.beforeEach((to, _from, next) => {
    document.title = (to?.meta?.title as string) || document.title
    next()
    // const { token } = store.state.accountModule
    // const whiteList = ['/login']
    // if (token || whiteList.includes(to.path)) {
    //   if (token) {
    //     if (to.path === '/login') {
    //       next('/home')
    //     } else {
    //       next()
    //     }
    //   } else {
    //     next()
    //   }
    // } else {
    //   next('/login')
    // }
  })
}
