import api from '~/api'

const state = {}

const getters = {}

const mutations = {}

const actions = {
  async getMerchant({ commit }, merchantId) {
    const [, result] = await api.get(`/catalogues/${merchantId}`)
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
