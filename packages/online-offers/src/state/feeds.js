import get from 'lodash/get'
import sortBy from 'lodash/sortBy'
import api from '~/api'

const state = {
  feeds: [],
}

const getters = {
  feeds: state => state.feeds,
}

const mutations = {
  SET_FEEDS(state, payload) {
    state.feeds = sortBy(payload, 'name')
  },
}

const actions = {
  async getFeedUpdates({ commit }) {
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
