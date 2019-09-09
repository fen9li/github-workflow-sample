import Vue from 'vue'
import Vuex from 'vuex'

import account from './account'
import ui from './ui'
import providers from './providers'
import provider from './provider'
import event from './event'
import rule from './rule'
import limit from './limit'
import membership from './membership'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    account,
    ui,
    providers,
    provider,
    event,
    rule,
    limit,
    membership,
  },
})
