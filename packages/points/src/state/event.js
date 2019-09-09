import api from '~/api'


const state = {}

const getters = {}

const mutations = {}

const actions = {
  async getEvent(store, id) {
    const result =  await api.get(`/events/${id}`)
    return result
  },
  async createEvent(store, form) {
    const result = await api.post('/events', form)
    return result
  },
  async updateEvent(store, form) {
    const result = await api.put(`/events/${form.id}`, form)
    return result
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
