import api from '~/api'

const state = {}

const getters = {}

const mutations = {}

const actions = {
  async getOffer({
    commit,
  }, offerId) {
    const [, result] = await api.get(`/offers/${offerId}`)
    return result
  },
  async getFeedOffer({
    commit,
  }, externalId) {
    const [, result] = await api.get(`/feedoffers/${externalId}`)
    return result
  },
  async createOffer({
    commit,
  }, payload) {
    return api.post('/offers', payload)
  },
  async updateOffer({
    commit,
  }, {
    id,
    payload,
  }) {
    return api.put(`/offers/${id}`, payload)
  },
  async deleteOffer({
    commit,
  }, offerId) {
    return api.delete(`/offers/${offerId}`)
  },

  async activateOffer({
    commit,
  }, {
    feedOfferId,
    payload,
  }) {
    return api.put(`/feedoffers/${feedOfferId}`, payload)
  },

  async activateOffersBulk({
    commit,
  }, payload) {
    // this action also serves as bulk deactivate
    return api.patch(`/offers`, payload)
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true,
}
