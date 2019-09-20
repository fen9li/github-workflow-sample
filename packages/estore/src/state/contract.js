import api from '~/api'

const state = {}

const getters = {}

const mutations = {}

const actions = {
  getContract(_, id) {
    return api.get(`contracts/${id}`)
  },
  toggleContractStatus(_, id) {
    return api.patch(`contracts/${id}/toggle-active`)
  },
  deleteContract(_, id) {
    return api.delete(`contracts/${id}`)
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true,
}
