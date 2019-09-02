const state = {}

const getters = {
  menu(state, getters, rootState, rootGetters) {
    return [
      {
        title: 'Dashboard',
        path: '/',
        icon: 's-data',
      },
      {
        title: 'Users',
        path: '/users',
        icon: 'user',
      },
      {
        title: 'Providers',
        path: '/providers',
        icon: 'tickets',
      },
      {
        title: 'Products',
        path: '/products',
        icon: 'goods',
      },
      {
        title: 'Roles',
        path: '/roles',
        icon: 'news',
      },
      {
        title: 'Logs',
        path: '/logs',
        icon: 'notebook-2',
      },
      {
        title: 'Settings',
        path: '/settings',
        icon: 'setting',
      },
    ]
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
