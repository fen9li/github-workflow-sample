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
    const res = await api.get(`/providers/${providerId}`)
    const [err, provider] = res

    if (err) {
      return err
    }

    commit('SET_PROVIDER', provider)

    return res
  },

  async updateProvider({ commit }, { providerId, form }) {
    const res = await api.put(`/providers/${providerId}`, form)
    const [err, provider] = res

    if (err) {
      return err
    }

    commit('SET_PROVIDER', provider)

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
