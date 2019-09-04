import api from '~/api'

const state = {
  product: {},
}

const getters = {}

const mutations = {
  SET_PRODUCT(state, payload) {
    state.product = payload
  }
}

const actions = {
  async getProduct({ commit }, productId) {
    const [error, result] = await api.get(`/products/${productId}`)
    commit('SET_PRODUCT', result)
    return [error, result]
  },

  createProduct(store, form) {
    return api.post('/products', form)
  },

  async updateProduct({ commit }, { productId, form }) {
    const [, result] = await api.put(`/products/${productId}`, form)
    commit('SET_PRODUCT', result)
    return result
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true,
}
