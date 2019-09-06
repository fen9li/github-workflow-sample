import Vue from 'vue'
import Vuex from 'vuex'

import account from './account'
import ui from './ui'
import providers from './providers'
import provider from './provider'
import rule from './rule'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    account,
    ui,
    providers,
    provider,
    rule,
  },
})
