import api from '~/api'

const state = {
  updateTable: false,
}

const getters = {
  tableUpdate: state => state.updateTable,
}

const mutations = {
  UPDATE_TABLE(state, payload = true) {
    state.updateTable = payload
  },
}

const actions = {
  async getOffer({ commit }, id) {
    const [, result] = await api.get(`/offers/${id}`)

    return result
  },

  async createOffer({ commit }, payload) {
    return api.post('/offers', payload)
  },

  async updateOffer({ commit }, { id, payload }) {
    return api.put(`/offers/${id}`, payload)
  },

  async deleteOffer({ commit }, id) {
    return api.delete(`/offers/${id}`)
  },

  async activateOffersBulk({ commit }, payload) {
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
