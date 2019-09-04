import api from '~/api'

const state = {
  products: { items: null, pagination: null, loading: false }
}

const getters = {}

const mutations = {
  SET_PRODUCTS(state, payload) {
    state.products = { ...state.products, ...payload }
  }
}

const actions = {
  async getProducts({ commit }) {
    commit('SET_PRODUCTS', { loading : true })
    const [, response] = await api.get(`/products`)
    commit('SET_PRODUCTS', { ...response, loading: false })
    return response
  },
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
