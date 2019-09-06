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
  async getRule({
    commit
  }, ruleId) {
    const res = await api.get(`/rules/${ ruleId }`)
    const [err, rule] = res

    if (err) {
      return err
    }

    commit('SET_RULE', rule)

    return res
  },

  async updateRule({
    commit
  }, {
    ruleId,
    form
  }) {
    const res = await api.put(`/rules/${ ruleId }`, form)
    const [err, rule] = res

    if (err) {
      return err
    }

    commit('SET_RULE', rule)

    return res
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true,
}
