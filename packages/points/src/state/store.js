import Vue from 'vue'
import Vuex from 'vuex'

import account from './account'
import ui from './ui'
import provider from './provider'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    account,
    ui,
    provider,
  },
})
