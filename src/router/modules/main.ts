import { RouteRecordRaw } from 'vue-router'
import Home from '@/views/Home'
import Echarts from '@/views/Vuex.vue'

// eslint-disable-next-line import/prefer-default-export
export const main: Array<RouteRecordRaw> = [
  {
    path: '/home',
    name: 'Home',
    meta: { title: '首页' },
    component: Home
  },
  {
    path: '/charts',
    name: 'Charts',
    meta: { title: 'eCharts图表' },
    component: Echarts
  },
  {
    path: '/form',
    name: 'Form',
    meta: { title: '表单' },
    component: () => import('@/views/Axios.vue')
  }
]
