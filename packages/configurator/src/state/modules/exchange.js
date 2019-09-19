import get from 'lodash/get'

const LS_URL_KEY = 'configurator-last-url'

const state = {
  status: 'waiting',
  provider: '',
  env: '',
  error: '',
  config: null,
  url: process.env.VUE_APP_DEFAULT_URL,
}

const getters = {
  url: s => s.url,
  frameUrl: s => `https://${s.url}?origin=${window.location.origin}`,
  ready: s => s.status === 'ready',
  error: s => s.error,
  env: s => s.env,
  provider: s => s.provider,
  waiting: s => s.status === 'waiting',
  connecting: s => s.status === 'connecting',
  connected: s => s.status === 'connected',
  config: s => s.config,
}

const mutations = {
  SET_WAITING_STATUS(state) {
    state.status = 'waiting'
  },
  SET_CONNECTING_STATUS(state) {
    state.error = ''
    state.status = 'connecting'
  },
  SET_CONNECTED_STATUS(state) {
    state.status = 'connected'
  },
  SET_READY_STATUS(state) {
    state.status = 'ready'
  },
  SET_URL(state, url) {
    state.url = url
  },
  SET_ERROR(state, error) {
    state.error = error
    state.status = 'waiting'
  },
  SET_PROVIDER(state, provider) {
    state.provider = provider
  },
  SET_ENV(state, env) {
    state.env = env
  },
  SET_CONFIG(state, config) {
    state.config = config
  },
}

const actions = {
  INIT({ dispatch, commit }) {
    const handler = payload => {
      dispatch('HANDLE_FRAME_MESSAGE', payload)
    }

    if (window.addEventListener) {
      window.addEventListener('message', handler, false)
    } else if (window.attachEvent) {
      window.attachEvent('onmessage', handler)
    }

    const savedUrl = localStorage.getItem(LS_URL_KEY)

    if (savedUrl) {
      commit('SET_URL', savedUrl)
      dispatch('CONNECT_TO_FRAME')
    }
  },
  async CONNECT_TO_FRAME({ commit, getters }) {
    try {
      commit('SET_CONNECTING_STATUS')

      await fetch(getters.frameUrl, {
        mode: 'no-cors'
      })
    } catch(err) {
      commit('SET_ERROR', 'No connection')
      localStorage.removeItem(LS_URL_KEY)
    }
  },
  HANDLE_FRAME_MESSAGE({ dispatch, getters }, message) {
    const trusted = new RegExp(message.origin).test(getters.frameUrl)

    if (!trusted) return

    try {
      let data = message.data

      if (typeof message.data === 'string' && /^(\[|\{)/.test(message.data)) {
        data = JSON.parse(message.data)
      }

      if (data.type === 'debi-loaded') {
        dispatch('ON_DEBI_LOADED', data)
      }
    } catch(error) {
      console.error(error)
    }
  },
  ON_DEBI_LOADED({ getters, commit, dispatch }, data) {
    const provider = get(data, 'payload.provider', '')
    const env = get(data, 'payload.env', '')
    const config = get(data, 'payload.config', {})

    commit('SET_READY_STATUS')
    commit('SET_PROVIDER', provider)
    commit('SET_ENV', env)

    localStorage.setItem(LS_URL_KEY, getters.url)

    if (config) {
      commit('SET_CONFIG', config)
      dispatch('dashboard/INIT', config.dashboard, { root: true })
    }
  },
  SEND_TO_FRAME({ rootGetters, getters }, payload) {
    const frameId = rootGetters['frame/frameId']
    const frame = window.frames[frameId]
    const message = JSON.stringify(payload)

    frame.contentWindow.postMessage(message, `https://${getters.url}`)
  },
  RESET() {
    localStorage.removeItem(LS_URL_KEY)
    window.location.reload()
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
