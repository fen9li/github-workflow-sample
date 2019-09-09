import api from '~/api'

const state = {
  rule: null,
}

const getters = {}

const mutations = {
  SET_RULE(state, payload) {
    state.rule = payload
  },
}

const actions = {
  async getRule({ commit }, ruleId) {
    const [err, rule]  = await api.get(`/global-rules/${ ruleId }`)
    if (rule) {
      commit('SET_RULE', rule)
    }
    return [err, rule]
  },

  async createRule(store, form) {
    const result = await api.post('/global-rules', form)
    return result
  },

  async updateRule({ commit }, { ruleId, form }) {
    const [err, rule] = await api.put(`/global-rules/${ ruleId }`, form)
    if (rule) {
      commit('SET_RULE', rule)
    }
    return [err, rule]
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true,
}
