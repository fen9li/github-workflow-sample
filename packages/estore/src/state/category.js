import api from '~/api'

const state = {}

const getters = {}

const mutations = {}

const actions = {
  getCategory(_, id) {
    return api.get(`category/${id}`)
  },
  deleteCategory(_, id) {
    return api.delete(`category/${id}`)
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true,
}
