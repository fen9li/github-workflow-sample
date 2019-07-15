import api from '~/api'

const state = {
}

const getters = {
}

const mutations = {
}

const actions = {
  async getFeedMerchant({ commit }, { merchantId }) {
    return api.get(`/feedmerchants/${merchantId}`)
  },
  async updateFeedMerchant({ commit }, { payload, id }) {
    return api.put(`/feedmerchants/${id}`, {
      metadata: { ...payload },
      enabled: true,
    })
  },
  async activateFeedMerchant({ commit }, { feedmerchantId, payload }) {
    return api.put(`/feedmerchants/${feedmerchantId}`, payload)
  },

}

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true,
}
