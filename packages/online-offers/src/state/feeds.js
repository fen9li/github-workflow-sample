import get from 'lodash/get'
import api from '~/api'

const state = {
  feeds: [],
}

const getters = {
  feeds: s => s.feeds,
}

const mutations = {
  SET_FEEDS(state, payload) {
    state.feeds = payload
  },
}

const actions = {
  async getFeeds({ commit }) {
    const [, response] = await api.get('/feeds')

    if (response) {
      commit('SET_FEEDS', get(response, 'items', []))
    }
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true,
}
