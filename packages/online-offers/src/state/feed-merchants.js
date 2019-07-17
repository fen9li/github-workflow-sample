import api from '~/api'

const state = {
}

const getters = {
}

const mutations = {
}

const actions = {
  async getFeedMerchant({
    commit,
  }, { merchantId }) {
    return api.get(`/feedmerchants/${merchantId}`)
  },

  async updateFeedMerchant({
    commit,
  }, { payload, id }) {
    return api.put(`/feedmerchants/${id}`, {
      metadata: { ...payload },
      enabled: true,
    })
  },

  async attachFeedMerchantToGlobalMerchant({
    commit,
  }, {
    merchantId,
    feedmerchantId,
  }) {
    return api.post(
      `/merchants/${merchantId}/feedmerchants/${feedmerchantId}`
    )
  },

  async detachFeedMerchantFromGlobamMerchant({
    commit,
  }, {
    merchantId,
    feedmerchantId,
  }) {
    return api.delete(
      `/merchants/${merchantId}/feedmerchants/${feedmerchantId}`
    )
  },

  async activateFeedMerchant({
    commit,
  }, {
    feedmerchantId,
    payload,
  }) {
    return api.put(`/feedmerchants/${feedmerchantId}`, payload)
  },

  async setDefaultFeedMerchant({
    commit,
  }, {
    merchantId,
    feedMerchantId,
  }) {
    return api.patch(
      `/merchants/${merchantId}/feedmerchants/${feedMerchantId}`
    )
  },

}

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true,
}
