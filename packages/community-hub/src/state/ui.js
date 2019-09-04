const state = {}

const getters = {
  menu(state, getters, rootState, rootGetters) {
    return [{
      title: 'Dashboard',
      path: '/dashboard',
      svg: 'menu/dashboard',
      menu: 'dashboard',
    }, {
      title: 'Retailers',
      path: '/retailers',
      svg: 'menu/retailers',
      menu: 'retailers',
    }, {
      title: 'Offers',
      path: '/offers',
      svg: 'menu/offers',
      menu: 'offers',
    }, {
      title: 'Categories',
      path: '/categories',
      svg: 'menu/categories',
      menu: 'categories',
    }, {
      title: 'Log',
      path: '/log',
      svg: 'menu/log',
      menu: 'log',
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
