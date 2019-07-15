import api from '~/api'

const state = {}

const getters = {}

const mutations = {}

const actions = {
  async createCatalog({ commit }, payload) {
    const [, result] = await api.post('/catalogues', payload)

    return result
  },

  async updateCatalog({ commit }, payload) {
    return api.put(`/catalogues/${payload.id}`, payload)
  },

  async deleteCatalog({ commit }, id) {
    return api.delete(`/catalogues/${id}`)
  },

  async getCatalogueMerchant({ commit }, merchantId) {
    return api.get(`/catalogues/${merchantId}`)
  },

  async attachCatalogueMerchants({ commit }, { catalogueId, merchants }) {
    return api.put(`/catalogues/${catalogueId}/merchants`, {
      merchants,
    })
  },

  async detachCatalogueMerchants({ commit }, { catalogueId, merchants }) {
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
