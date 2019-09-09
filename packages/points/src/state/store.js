import Vue from 'vue'
import Vuex from 'vuex'

import account from './account'
import ui from './ui'
import providers from './providers'
import provider from './provider'
import event from './event'
import events from './events'
import rule from './rule'
import globalLimit from './global-limit.js'
import membership from './membership'
import badge from './badge'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    account,
    ui,
    providers,
    provider,
    event,
    events,
    rule,
    globalLimit,
    membership,
    badge,
  },
})
