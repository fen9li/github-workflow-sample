import api from '~/api'

const state = {
}

const getters = {
}

const mutations = {
}

const actions = {
  async updateFeedMerchant({ commit }, { payload, id }) {
    return api.put(`/feedmerchants/${id}`, {
      metadata: { ...payload },
      enabled: true,
    })
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true,
}
