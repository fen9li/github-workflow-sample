import api from '~/api'

const state = {
  limit: null,
}

const getters = {}

const mutations = {
  SET_LIMIT(state, payload) {
    state.limit = payload
  },
}

const actions = {
  async createLimit({ commit }, form) {
    const res = await api.post(`/limits/`, form)
    const [err] = res

    if (err) {
      return err
    }

    return res
  },

  async updateLimit({ commit }, { limitId, form }) {
    const res = await api.put(`/limits/${limitId}`, form)
    const [err, limit] = res

    if (err) {
      return err
    }

    commit('SET_LIMIT', limit)

    return res
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true,
}
