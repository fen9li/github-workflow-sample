import api from '~/api'


const state = {}

const getters = {}

const mutations = {}

const actions = {
  async approveEventOccurrence(store, id) {
    const result = await api.post(`/event-occurrences/${id}/approvals`)
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
