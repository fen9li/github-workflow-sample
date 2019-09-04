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
  async getProvider({
    commit,
  }, payload) {
    return api.get(`/providers/${payload.id}`, payload)
  },

  async createProvider({
    commit,
  }, payload) {
    return api.post('/providers', payload)
  },

  async updateProvider({
    commit,
  }, payload) {
    return api.put(`/providers/${payload.id}`, payload)
  },

  async getProviderProducts({ commit }) {
    commit('SET_PRODUCTS', { loading : true })
    const [, response] = await api.get(`/products`)
    commit('SET_PRODUCTS', { ...response, loading: false })
    return response
  },

}

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true,
}
