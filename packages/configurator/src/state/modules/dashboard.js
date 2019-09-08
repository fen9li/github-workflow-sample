const state = {
  /*
   * Available widgets
   */
  registered: {},
  widgets: [],
  selectedWidget: null,
}

const getters = {
  widgets: s => s.widgets,
  registered: s => s.registered,
  selectedWidget: s => s.selectedWidget,
}

const mutations = {
  REGISTER_WIDGET(state, payload) {
    state.registered[payload.name] = payload
  },
  ADD_WIDGET(state, payload) {
    state.widgets.push(payload)
  },
  REMOVE_WIDGET() {

  },
  MOVE_WIDGET_UP(state, widget) {
    const { widgets } = state
    const index = widgets.indexOf(widget)

    if (index > 0) {
      const prevWidget = widgets[index - 1]
      state.widgets.splice(index - 1, 2, widget, prevWidget)
    }
  },
  MOVE_WIDGET_DOWN(state, widget) {
    const { widgets } = state
    const index = widgets.indexOf(widget)

    if (index < widgets.length) {
      const nextWidget = widgets[index + 1]
      state.widgets.splice(index, 2, nextWidget, widget)
    }
  },
  RESET(state) {
    state.widgets = []
  },
}

const actions = {
  INIT({ commit, getters }, config) {
    const registered = getters.registered

    if (config instanceof Array) {
      commit('RESET')

      config.forEach(record => {
        const widget = registered[record.name] || registered.unknown

        if (widget) {
          commit('ADD_WIDGET', {
            ...widget,
            data: record,
          })
        }
      })
    }
  },
  BUILD_CONFIG() {

  },
  RESET({ dispatch, commit, rootGetters }) {
    const config = rootGetters['exchange/config'] || {}
    dispatch('INIT', config.dashboard)
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
