const state = {}

const getters = {
  menu(state, getters, rootState, rootGetters) {
    return [{
      title: 'Dashboard',
      path: '/',
      icon: 's-data',
      menu: 'dashboard',
    }, {
      title: 'Users',
      path: '/users',
      icon: 'user',
      menu: 'users',
    }, {
      title: 'Providers',
      path: '/providers',
      icon: 'tickets',
      menu: 'providers',
    }, {
      title: 'Products',
      path: '/products',
      icon: 'goods',
      menu: 'products',
    }, {
      title: 'Roles',
      path: '/roles',
      icon: 'news',
      menu: 'roles',
    }, {
      title: 'Logs',
      path: '/logs',
      icon: 'notebook-2',
      menu: 'logs',
    }, {
      title: 'Settings',
      path: '/settings',
      icon: 'setting',
      menu: 'settings',
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
