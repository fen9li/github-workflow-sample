import api from '~/api'

const state = {}

const getters = {}

const mutations = {}

const actions = {
  async getFeedOffer({
    commit,
  }, externalId) {
    return api.get(`/feedoffers/${externalId}`)
  },
  async activateFeedOffer({
    commit,
  }, {
    feedOfferId,
    payload,
  }) {
    return api.put(`/feedoffers/${feedOfferId}`, payload)
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true,
}
