import api from '~/api'

const state = {}

const getters = {}

const mutations = {}

const actions = {
  async getMerchants() {
    return api.get('/merchants')
  },

  async searchGlobalMerchants({
    commit
  }, search) {
    if (search) {
      return api.get(`/merchants?search=${search}`)
    } else {
      return api.get('/merchants')
    }
  },

  async getGlobalMerchant({
    commit,
  }, merchantId) {
    return api.get(`/merchants/${merchantId}`)
  },

  async getGlobalMerchantFeeds({
    commit
  }, merchantId) {
    return api.get(`/merchants/${merchantId}/feeds`)
  },

  async getGlobalMerchantOffers({
    commit,
  }, merchantId) {
    return api.get(`/merchants/${merchantId}/offers`)
  },

  async createGlobalMerchant({
    commit,
  }, payload) {
    return api.post('/merchants', payload)
  },

  async updateGlobalMerchant({
    commit,
  }, {
    merchantId,
    payload,
  }) {
    return api.put(`/merchants/${merchantId}`, payload)
  },

  async deleteGlobalMerchant({
    commit,
  }, { merchantId }) {
    return api.delete(`/merchants/${merchantId}`)
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true,
}
