import api from '~/api'

const state = {
  products: { items: null, pagination: null, loading: false },
  versions: [],
}

const getters = {}

const mutations = {
  SET_PRODUCTS(state, payload) {
    state.products = { ...state.products, ...payload }
  },
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

  async getProviderProducts({ dispatch, commit }) {
    commit('SET_PRODUCTS', { loading : true })
    const [, response] = await api.get(`/products`)
    if (response) {
      dispatch('getProductVersions', response)
    }
    return response
  },

  async getProductVersions({ state, dispatch, commit }, products) {
    const { items } = products
    const ids = items.map(item => item.id)
    const results = await Promise.all(ids.map(async id => {
      const [, response] = await api.get(`/products/${id}/versions`)
      return {
        id,
        versions: response.items
      }
    }))
    if (results.length) {
      results.map(result => {
        const index = items.findIndex(item => item.id === result.id)
        items[index].versions = result.versions
      })
      commit('SET_PRODUCTS', {
        ...products,
        loading: false
      })
    }
  },



}

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true,
}
