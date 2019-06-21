import api from '~/api'
import get from 'lodash/get'

const state = {
  categories: [],
  updateTable: false,
}

const getters = {
  tableUpdate: state => state.updateTable,
}

const mutations = {
  UPDATE_TABLE(state, payload = true) {
    state.updateTable = payload
  },
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
    api.post('/categories', payload).then(() => {
      commit('UPDATE_TABLE')
    })
  },
  updateCategory({ commit }, payload) {
    api.put(`/categories/${payload.id}`, payload).then(() => {
      commit('UPDATE_TABLE')
    })
  },
  deleteCategory({ commit }, id) {
    api.delete(`/categories/${id}`).then(() => {
      commit('UPDATE_TABLE')
    })
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true,
}
