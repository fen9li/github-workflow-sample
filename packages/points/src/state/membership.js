import api from '~/api'

const state = {
  membership: {},
}

const getters = {}

const mutations = {
  SET_MEMBERSHIP(state, payload)  {
    state.membership = payload
  }
}

const actions = {
  async getMembership({ commit }, id) {
    const [error, result] =  await api.get(`/memberships/${id}`)
    if (result) {
      commit('SET_MEMBERSHIP', result)
    }
    return [error, result]
  },
  async createMembership(store, form) {
    const result = await api.post('/memberships', form)
    return result
  },
  async updateMembership({ commit }, { id, form }) {
    const [error, result] = await api.put(`/memberships/${id}`, form)
    if (result) {
      commit('SET_MEMBERSHIP', result)
    }
    return [error, result]
  },
  async deleteMembership({ commit }, id) {
    const [error, result] = await api.delete(`/memberships/${id}`)
    // empty string in result
    if (result || typeof result === 'string') {
      commit('SET_MEMBERSHIP', {})
    }
    return [error, result]
  }
}

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true,
}
