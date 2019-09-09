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
    const res = await api.get(`/global-limits/${limitId}`)
    const [err, limit] = res

    if (err) {
      return err
    }

    commit('SET_LIMIT', limit)

    return res
  },
  async createGlobalLimit({ commit }, form) {
    const res = await api.post('/global-limits/', form)
    const [err] = res

    if (err) {
      return err
    }

    return res
  },

  async updateGlobalLimit({ commit }, { limitId, form }) {
    const res = await api.put(`/global-limits/${limitId}`, form)
    const [err, limit] = res

    if (err) {
      return err
    }

    commit('SET_LIMIT', limit)

    return res
  },

  async deleteGlobalLimit({ commit }, limitId) {
    const res = await api.delete(`/global-limits/${limitId}`)
    const [err] = res

    if (err) {
      return err
    }

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
