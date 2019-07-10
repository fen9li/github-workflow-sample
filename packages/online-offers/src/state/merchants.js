import api from '~/api'

const state = {}

const getters = {}

const mutations = {}

const actions = {
  async getMerchants() {
    return api.get('/merchants')
  },
  async searchMerchants({ commit }, search) {
    if (search) {
      return api.get(`/merchants?search=${search}`)
    } else {
      return api.get('/merchants')
    }
  },
  async getGlobalMerchant({ commit }, merchantId) {
    return api.get(`/merchants/${merchantId}`)
  },
  async getMerchantFeeds({ commit }, merchantId) {
    return api.get(`/merchants/${merchantId}/feeds`)
  },
  async getMerchant({ commit }, { merchantId }) {
    return api.get(`/feedmerchants/${merchantId}`)
  },
  async getMerchantOffers({ commit }, merchantId) {
    return api.get(`/merchants/${merchantId}/offers`)
  },
  async createMerchant({ commit }, payload) {
    return api.post('/merchants', payload)
  },
  async associateMerchant({ commit }, { merchantId, feedmerchantId }) {
    return api.post(`/merchants/${merchantId}/feedmerchants/${feedmerchantId}`)
  },
  async detachMerchant({ commit }, { merchantId, feedmerchantId }) {
    return api.delete(
      `/merchants/${merchantId}/feedmerchants/${feedmerchantId}`
    )
  },
  async activateMerchant({ commit }, { feedmerchantId, payload }) {
    return api.put(`/feedmerchants/${feedmerchantId}`, payload)
  },
  async updateMerchant({ commit }, { merchantId, payload }) {
    return api.put(`/merchants/${merchantId}`, payload)
  },
  async deleteMerchant({ commit }, { merchantId }) {
    return api.delete(`/merchants/${merchantId}`)
  },
  async setDefaultFeedMerchant(_, { merchantId, feedMerchantId }) {
    return api.patch(`/merchants/${merchantId}/feedmerchants/${feedMerchantId}`)
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true,
}
