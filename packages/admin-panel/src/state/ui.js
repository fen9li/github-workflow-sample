
const state = {}

const getters = {
  menu(state, getters, rootState, rootGetters) {
    return [
      {
        title: 'Dashboard',
        path: '/dashboard',
        icon: 'user',
      },
      {
        title: 'Retailers',
        path: '/retailers',
        icon: 'goods',
      },
      {
        title: 'Offers',
        path: '/offers',
        icon: 'tickets',
      },
      {
        title: 'Categories',
        path: '/categories',
        icon: 'refresh-right',
      },
      {
        title: 'Log',
        path: '/log',
        icon: 'notebook-2',
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
