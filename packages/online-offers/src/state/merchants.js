import api from '~/api'

const state = {
  updateTable: false,
}

const getters = {
  tableUpdate: state => state.updateTable,
}

const mutations = {
  UPDATE_TABLE(state, payload = true) {
    state.updateTable = payload
  },
}

const actions = {
  async searchMerchants({ commit }, search) {
    if (search) {
      return await api.get(`/merchants?search=${search}`)
    } else {
      return await api.get('/merchants')
    }
  },
  async getMerchant({ commit }, { merchantId }) {
    return await api.get(`/feedmerchants/${merchantId}`)
  },
  async createMerchant({ commit }, payload) {
    return await api.post('/merchants', payload)
  },
  async associateMerchant({ commit }, { merchantId, feedmerchantId }) {
    await api.post(`/merchants/${merchantId}/feedmerchants/${feedmerchantId}`)
  },
  async activateMerchant({ commit }, { merchantId }) {
    await api.put(`/feedmerchants/${merchantId}`, { enabled: true })
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true,
}
