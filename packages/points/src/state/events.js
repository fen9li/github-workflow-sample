import api from '~/api'
import get from 'lodash/get'

const state = {
  events: [],
}

const getters = {}

const mutations = {
  SET_EVENTS(state, payload) {
    state.events = payload
  },
}

const actions = {
  async getEvents({ commit }) {
    const [, response] = await api.get('/events')
    const items = get(response, 'items', [])

    if (response) {
      commit('SET_EVENTS', items)
    }

    return items
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true,
}
