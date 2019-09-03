import api from '~/api'

const state = {}

const getters = {}

const mutations = {}

const actions = {
  async getProvider({
    commit,
  }, payload) {
    return api.get(`/providers/${payload.id}`, payload)
  },

  async createProvider({
    commit,
  }, payload) {
    return api.post('/providers', payload)
  },

  async updateProvider({
    commit,
  }, payload) {
    return api.put(`/providers/${payload.id}`, payload)
  },



}

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true,
}
