import { createStore, createLogger } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import account from './modules/account'
import dict from './modules/dict'

const isProd = process.env.NODE_ENV === 'production'

export default createStore({
  state: {
    name: 'Home'
  },
  mutations: {},
  actions: {},
  modules: {
    account,
    dict
  },
  plugins: isProd ? [createPersistedState()] : [createPersistedState(), createLogger()]
})
