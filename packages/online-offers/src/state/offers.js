import api from '~/api'

const state = {}

const getters = {}

const mutations = {}

const actions = {
  async getGlobalOffer({
    commit,
  }, offerId) {
    return api.get(`/offers/${offerId}`)
  },

  async createGlobalOffer({
    commit,
  }, payload) {
    return api.post('/offers', payload)
  },

  async updateGlobalOffer({
    commit,
  }, {
    id,
    payload,
  }) {
    return api.put(`/offers/${id}`, payload)
  },

  async deleteGlobalOffer({
    commit,
  }, offerId) {
    return api.delete(`/offers/${offerId}`)
  },

  async toggleGlobalOffersActive({
    commit,
  }, payload) {
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
