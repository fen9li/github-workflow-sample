import Vue from 'vue'
import Vuex from 'vuex'
import ui from './ui'
import feeds from './feeds'
import categories from './categories'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    ui,
    feeds,
    categories,
  },
})
