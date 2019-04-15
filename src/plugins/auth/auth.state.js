// import axios from 'axios'

export const STATE = {
  profile: null,
}

export const GETTERS = {
  profile: s => s.profile,
}

export const MUTATIONS = {
  SET_PROFILE(state, profile) {
    state.profile = profile
  },
}

export const ACTIONS = {
}

export default {
  namespaced: true,
  state: STATE,
  getters: GETTERS,
  actions: ACTIONS,
  mutations: MUTATIONS,
}
