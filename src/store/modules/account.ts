import router from '@/router'
import request from '@/utils/request'

export default {
  namespaced: true,
  state: () => ({
    userInfo: {},
    token: ''
  }),
  mutations: {
    SET_USER_INFO: (state: any, userInfo: any) => {
      state.userInfo = userInfo
    },
    SET_TOKEN: (state: any, token: string) => {
      state.token = token
    }
  },
  actions: {
    setToken({ commit }, token) {
      commit('SET_TOKEN', token)
    },

    async GetUserInfo({ commit }: any) {
      const { data } = await request.post('user/getUserInfomation.do')
      commit('SET_USER_INFO', data)
    },

    async Logout({ commit }: any) {
      await request.post('logout.html')
      commit('SET_USER_INFO', '')
      commit('SET_TOKEN', '')
      router.push({ path: '/login' })
    }
  }
}
