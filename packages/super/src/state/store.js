import Vue from 'vue'
import Vuex from 'vuex'
import ui from './ui'
import product from './product.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    ui,
    product,
  },
})
