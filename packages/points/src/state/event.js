import api from '~/api'

const state = {
  event: {},
}

const getters = {}

const mutations = {
  SET_EVENT(state, payload) {
    state.event = payload
  }
}

const actions = {
  async getEvent({ commit }, id) {
    const [error, result] =  await api.get(`/events/${id}`)
    if (result) {
      commit('SET_EVENT', result)
    }
    return [error, result]
  },
  async createEvent(store, form) {
    const result = await api.post('/events', form)
    return result
  },
  async updateEvent({ commit }, form) {
    const [error, result] = await api.put(`/events/${form.id}`, form)
    if (result) {
      commit('SET_EVENT', result)
    }
    return [error, result]
  },
  async deleteEvent(store, id) {
    const result = await api.delete(`/events/${id}`)
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
