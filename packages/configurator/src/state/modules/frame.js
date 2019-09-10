
const state = {
  id: 'app-frame',
  viewport: 'full',
}

const getters = {
  frameId: s => s.id,
  viewport: s => s.viewport,
  showFrame: (s, g, rs, rg) => {
    return rg['exchange/connected'] || rg['exchange/ready']
  }
}

const mutations = {
  SET_VIEWPORT(state, viewport) {
    state.viewport = viewport
  },
}

const actions = {}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
