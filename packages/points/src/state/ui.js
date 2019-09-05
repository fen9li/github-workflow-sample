const state = {}

const getters = {
  menu(state, getters, rootState, rootGetters) {
    return [{
      title: 'Accounts',
      path: '/accounts',
      icon: 's-data',
      menu: 'accounts',
    }, {
      title: 'Providers',
      path: '/providers',
      icon: 'tickets',
      menu: 'providers',
    }, {
      title: 'Rules',
      path: '/rules',
      icon: 'news',
      menu: 'rules',
    }, {
      title: 'Events',
      path: '/events',
      icon: 'phone-outline',
      menu: 'events',
    }, {
      title: 'Event Occurrences',
      path: '/event_occurrences',
      icon: 'notebook-2',
      menu: 'event_occurrences',
    }, {
      title: 'Limits',
      path: '/limits',
      icon: 'film',
      menu: 'limits',
    }, {
      title: 'Badges',
      path: '/badges',
      icon: 'help',
      menu: 'badges',
    }, {
      title: 'Memberships',
      path: '/memberships',
      icon: 'user',
      menu: 'memberships',
    }, ]
  },
}

const mutations = {}

const actions = {}

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true,
}
