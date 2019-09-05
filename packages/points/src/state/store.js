import Vue from 'vue'
import Vuex from 'vuex'

import ui from './ui'
import provider from './provider'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    ui,
    provider,
  },
})
