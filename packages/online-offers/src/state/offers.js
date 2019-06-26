import api from '~/api'

const state = {
  updateTable: false,
}

const getters = {
  tableOffersUpdate: state => state.updateTable,
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
    return await api.post('/offers', payload)
  },
  async updateOffer({ commit }, { id, payload }) {
    return await api.put(`/offers/${id}`, payload)
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true,
}
