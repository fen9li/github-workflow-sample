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
    const [, result] = await api.put(`/catalogues/${payload.id}`, payload)

    return result
  },
  deleteCatalog({ commit }, id) {
    return api.delete(`/catalogues/${id}`)
  },

  async getMerchant({ commit }, merchantId) {
    const [, result] = await api.get(`/catalogues/${merchantId}`)

    return result
  },
  async attachMerchant({ commit }, { catalogueId, merchantId }) {
    const [, result] = await api.post(
      `/catalogues/${catalogueId}/merchants/${merchantId}`
    )

    return result
  },
  async attachMerchantsBulk({ commit }, { catalogueId, merchants }) {
    const [, result] = await api.put(`/catalogues/${catalogueId}/merchants`, {
      merchants,
    })

    return result
  },
  async detachMerchant({ commit }, { catalogueId, merchantId }) {
    const [, result] = await api.delete(
      `/catalogues/${catalogueId}/merchants/${merchantId}`
    )

    return result
  },

  async detachMerchantsBulk({ commit }, { catalogueId, merchants }) {
    const [, result] = await api.delete(
      `/catalogues/${catalogueId}/merchants`,
      { data: { merchants } }
    )

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
