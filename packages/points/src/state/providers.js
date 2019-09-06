import api from '~/api'
import get from 'lodash/get'

const state = {
  providers: [],
}

const getters = {}

const mutations = {
  SET_PROVIDERS(state, payload) {
    state.providers = payload
  }
}

const actions = {
  async getProviders({
    commit,
  }) {
    const [, response] = await api.get('/providers')
    const items = get(response, 'items', [])
    if (response) {
      commit('SET_PROVIDERS', items)
    }
    return items
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true,
}
