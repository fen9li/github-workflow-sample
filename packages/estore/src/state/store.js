import Vue from 'vue'
import Vuex from 'vuex'

import ui from './ui'
import category from './category'
import contract from './contract'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    ui,
    category,
    contract,
  },
})
