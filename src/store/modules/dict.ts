import request from '@/utils/request'

export type OptionType = {
  dm: string
  id: string
  name: string
}

export default {
  namespaced: true,
  state: () => ({
    xb: [],
    educational: []
  }),
  // getters: {
  //   getDictTxt:
  //     (state: any) =>
  //     ({ lxjp, value }: any) => {
  //       const dict = state[lxjp]
  //       return dict.find((item: { value: string }) => item.value === value).text
  //     }
  // },
  mutations: {
    SET_DICT(state, payload: any) {
      state[payload.type] = payload.options
    }
  },
  actions: {
    async fetchDict({ commit }, type) {
      const { data } = await request.get('dictionary/selectByType.do', { type })
      commit('SET_DICT', {
        type,
        options: data.map((item: { name: any; code: any }) => ({
          text: item.name,
          value: item.code
        }))
      })
    }
  }
}
