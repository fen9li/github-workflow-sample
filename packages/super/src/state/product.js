import api from '~/api'

const state = {}

const getters = {}

const mutations = {}

const actions = {
  createProduct(store, form) {
    return api.post('/products', form)
  }
}

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true,
}
