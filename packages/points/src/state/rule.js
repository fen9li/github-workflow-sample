import api from '~/api'

const state = {
  rule: null,
}

const getters = {
  rule: s => s.rule,
}

const mutations = {
  SET_RULE(state, payload) {
    state.rule = payload
  },
}

const actions = {
  async getRule({
    commit
  }, ruleId) {
    const [err, rule] = await api.get(`/global-rules/${ ruleId }`)
    if (rule) {
      commit('SET_RULE', rule)
    }
    return [err, rule]
  },

  async setRule({
    commit
  }, rule) {
    commit('SET_RULE', rule)
  },

  async createRule(store, form) {
    const result = await api.post('/global-rules', form)
    return result
  },

  async updateRule({
    commit
  }, {
    ruleId,
    form
  }) {
    const [err, rule] = await api.put(`/global-rules/${ ruleId }`, form)
    if (rule) {
      commit('SET_RULE', rule)
    }
    return [err, rule]
  },

  async removeRule({
    commit
  }, ruleId) {
    const [err, rule] = await api.delete(`/global-rules/${ ruleId }`)
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
