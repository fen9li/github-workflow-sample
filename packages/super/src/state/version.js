import api from '~/api'

const state = {}

const getters = {}

const mutations = {}

const actions = {
  getVersion(store, { productId, versionId }) {
    return api.get(`/products/${productId}/versions/${versionId}`)
  },

  createVersion(store, { productId, form }) {
    return api.post(`/products/${productId}/versions/`, form)
  },

  updateVersion(store, { productId, versionId, form }) {
    return api.put(`/products/${productId}/versions/${versionId}`, form)
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true,
}
