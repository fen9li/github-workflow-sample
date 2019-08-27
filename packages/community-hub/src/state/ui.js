const state = {}

const getters = {
  menu(state, getters, rootState, rootGetters) {
    return [{
      title: 'Dashboard',
      path: '/dashboard',
      svg: 'menu/dashboard',
    }, {
      title: 'Retailers',
      path: '/retailers',
      svg: 'menu/retailers',
    }, {
      title: 'Offers',
      path: '/offers',
      svg: 'menu/offers',
    }, {
      title: 'Categories',
      path: '/categories',
      svg: 'menu/categories',
    }, {
      title: 'Log',
      path: '/log',
      svg: 'menu/log',
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
