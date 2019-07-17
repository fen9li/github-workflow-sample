import api from '~/api'

const state = {}

const getters = {}

const mutations = {}

const actions = {
  async createCatalogue({
    commit,
  }, payload) {
    return api.post('/catalogues', payload)
  },

  async updateCatalogue({
    commit,
  }, payload) {
    return api.put(`/catalogues/${payload.id}`, payload)
  },

  async deleteCatalogue({
    commit,
  }, id) {
    return api.delete(`/catalogues/${id}`)
  },

  async getMerchantFromCatalogue({
    commit,
  }, merchantId) {
    return api.get(`/catalogues/${merchantId}`)
  },

  async linkMerchantToCatalogue({
    commit
  }, {
    catalogueId,
    merchants
  }) {
    return api.put(`/catalogues/${catalogueId}/merchants`, {
      merchants,
    })
  },

  async unlinkMerchantFromCatalogue({
    commit,
  }, {
    catalogueId,
    merchants,
  }) {
    return api.delete(`/catalogues/${catalogueId}/merchants`,
      { data: { merchants } }
    )
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true,
}
