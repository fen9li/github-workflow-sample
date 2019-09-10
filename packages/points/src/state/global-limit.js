import api from '~/api'

const state = {
  globalLimit: null,
}

const getters = {}

const mutations = {
  SET_LIMIT(state, payload) {
    state.globalLimit = payload
  },
}

const actions = {
  async getGlobalLimit({ commit }, limitId) {
    const [error, result] = await api.get(`/global-limits/${limitId}`)
    if (result) {
      commit('SET_LIMIT', result)
    }
    return [error, result]
  },
  async createGlobalLimit({ commit }, form) {
    const response = await api.post('/global-limits/', form)
    return response
  },

  async updateGlobalLimit({ commit }, { limitId, form }) {
    const [error, result] = await api.put(`/global-limits/${limitId}`, form)
    if (result) {
      commit('SET_LIMIT', result)
    }
    return [error, result]
  },

  async deleteGlobalLimit({ commit }, limitId) {
    const response = await api.delete(`/global-limits/${limitId}`)
    return response
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true,
}
