import get from 'lodash/get'

const state = {
  status: 'waiting',
  provider: '',
  error: '',
  url: 'localhost:8080',
}

const getters = {
  url: s => s.url,
  frameUrl: s => `https://${s.url}?origin=${window.location.origin}`,
  ready: s => s.status === 'ready',
  error: s => s.error,
  waiting: s => s.status === 'waiting',
  connecting: s => s.status === 'connecting',
  connected: s => s.status === 'connected',
  showFrame: (s, g) => g.connected || g.ready,
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
  },
  SET_PROVIDER(state, provider) {
    state.provider = provider
  },
}

const actions = {
  HANDLE_FRAME_MESSAGE({ commit, getters }, payload) {
    const trusted = new RegExp(payload.origin).test(getters.frameUrl)

    if (!trusted) return

    try {
      const data = JSON.parse(payload.data)

      if (data.type === 'debi-loaded') {
        const provider = get(data, 'payload.provider', '')

        commit('SET_READY_STATUS')
        commit('SET_PROVIDER', provider)
      }
    } catch(err) {
      // catch error
    }
  },
  INIT({ dispatch }) {
    const handler = payload => {
      dispatch('HANDLE_FRAME_MESSAGE', payload)
    }

    if (window.addEventListener) {
      window.addEventListener('message', handler, false)
    } else if (window.attachEvent) {
      window.attachEvent('onmessage', handler)
    }
  },
  async CONNECT_TO_FRAME({ commit, getters }) {
    try {
      await fetch(getters.frameUrl, {
        mode: 'no-cors'
      })

      commit('SET_CONNECTING_STATUS')
    } catch(err) {
      commit('SET_ERROR', 'No connection')
    }
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
