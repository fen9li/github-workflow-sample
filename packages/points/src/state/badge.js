import api from '~/api'

const state = {}

const getters = {}

const mutations = {}

const actions = {
  async getBadge(store, id) {
    const result = await api.get(`/badges/${ id }`)
    return result
  },
  async createBadge(store, form) {
    const result = await api.post('/badges', form)
    return result
  },
  async updateBadge(store, { id, form }) {
    const result = await api.put(`/badges/${ id }`, form)
    return result
  },
  async archiveBadge(store, id) {
    const result = await api.delete(`/badges/${ id }`)
    return result
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true,
}
