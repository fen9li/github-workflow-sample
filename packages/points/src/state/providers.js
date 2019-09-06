import api from '~/api'
import get from 'lodash/get'

const state = {
  providers: [],
}

const getters = {
  getProviderName: state => id => {
    if (state.providers.length) {
      const provider = state.providers.find(provider => provider.id === id)
      return provider.name
    }
    return null
  },
}

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
