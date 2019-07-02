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
  async getMerchants() {
    return await api.get('/merchants')
  },
  async searchMerchants({ commit }, search) {
    if (search) {
      return await api.get(`/merchants?search=${search}`)
    } else {
      return await api.get('/merchants')
    }
  },
  async getGlobalMerchant({ commit }, merchantId) {
    return await api.get(`/merchants/${merchantId}`)
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
  async detachMerchant({ commit }, { merchantId, feedmerchantId }) {
    await api.delete(`/merchants/${merchantId}/feedmerchants/${feedmerchantId}`)
  },
  async activateMerchant({ commit }, { merchantId }) {
    await api.put(`/feedmerchants/${merchantId}`, { enabled: true })
  },
  async updateMerchant({ commit }, { merchantId, payload }) {
    return await api.put(`/merchants/${merchantId}`, payload)
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true,
}
