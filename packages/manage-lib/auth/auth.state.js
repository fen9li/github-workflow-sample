// import axios from 'axios'

export const STATE = {
  profile: null,
  accessToken: null
}

export const GETTERS = {
  profile: state => state.profile,
  loggedIn: state => state.profile,
  token: state => state.accessToken
}

export const MUTATIONS = {
  SET_PROFILE(state, profile) {
    state.profile = profile
  },
  SET_TOKEN(state, accessToken) {
    state.accessToken = accessToken
  }
}

export const ACTIONS = {}

export default {
  namespaced: true,
  state: STATE,
  getters: GETTERS,
  actions: ACTIONS,
  mutations: MUTATIONS
}
