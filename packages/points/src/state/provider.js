import api from '~/api'

const state = {
  provider: null,
}

const getters = {}

const mutations = {
  SET_PROVIDER(state, payload) {
    state.provider = payload
  },
}

const actions = {
  async getProvider({ commit }, providerId) {
    const [error, result] = await api.get(`/providers/${providerId}`)
    if (result) {
      commit('SET_PROVIDER', result)
    }
    return [error, result]
  },

  async updateProvider({ commit }, { providerId, form }) {
    const [error, result] = await api.put(`/providers/${providerId}`, form)
    if (result) {
      commit('SET_PROVIDER', result)
    }
    return [error, result]
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true,
}
