import api from '~/api'

const state = {}

const getters = {}

const mutations = {}

const actions = {
  async getAccount(store, id) {
    const result =  await api.get(`/accounts/${id}`)
    return result
  },
  async createAccount(store, form) {
    const result = await api.post('/accounts', form)
    return result
  },
  async updateAccount(store, { id, form }) {
    const result = await api.put(`/accounts/${id}`, form)
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
