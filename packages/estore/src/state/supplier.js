import api from '~/api'

const state = {
  supplier: {},
}

const getters = {}

const mutations = {
  SET_SUPPLIER(state, payload) {
    state.supplier = payload
  }
}

const actions = {
  async getSupplier({ commit }, supplierId) {
    const [error, result] = await api.get(`/suppliers/${supplierId}`)
    commit('SET_SUPPLIER', result)
    return [error, result]
  },

  createSupplier(store, { form }) {
    return api.post('/suppliers', form)
  },

  async updateSupplier({ commit }, { supplierId, form }) {
    const [, result] = await api.put(`/suppliers/${supplierId}`, form)
    commit('SET_SUPPLIER', result)
    return result
  },

  async deleteSupplier({ commit }, supplierId) {
    return api.delete(`/suppliers/${supplierId}`)
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true,
}
