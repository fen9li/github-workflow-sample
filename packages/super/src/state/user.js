import api from '~/api'

const state = {}

const getters = {}

const mutations = {}

const actions = {
  async getUser(store, id) {
    const result =  await api.get(`/users/${id}`)
    return result
  },
  async createUser(store, form) {
    const result = await api.post('/users', form)
    return result
  },
  async updateUser(store, { id, form }) {
    const result = await api.put(`/users/${id}`, form)
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
