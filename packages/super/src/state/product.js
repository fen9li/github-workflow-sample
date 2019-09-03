import api from '~/api'

const state = {}

const getters = {}

const mutations = {}

const actions = {
  getProduct(store, productId) {
    return api.get(`/products/${productId}`)
  },
  createProduct(store, form) {
    return api.post('/products', form)
  },
  updateProduct(store, { productId, form }) {
    return api.put(`/products/${productId}`, form)
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true,
}
