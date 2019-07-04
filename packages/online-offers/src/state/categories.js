import api from '~/api'
import get from 'lodash/get'

const state = {
  categories: [],
}

const getters = {}

const mutations = {
  SET_CATEGORIES(state, payload) {
    state.categories = payload
  },
}

const actions = {
  async getCategories({ commit }) {
    const [, response] = await api.get(`/categories`)

    if (response) {
      commit('SET_CATEGORIES', get(response, 'items', []))
    }
  },
  createCategory({ commit }, payload) {
    return api.post('/categories', payload)
  },
  updateCategory({ commit }, payload) {
    return api.put(`/categories/${payload.id}`, payload)
  },
  deleteCategory({ commit }, id) {
    return api.delete(`/categories/${id}`)
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true,
}
