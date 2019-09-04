const state = {}

const getters = {
  menu(state, getters, rootState, rootGetters) {
    return [{
      title: 'Clients',
      path: '/clients',
      icon: 'user',
      menu: 'clients',
    }, {
      title: 'Global Merchants',
      path: '/merchants',
      icon: 'goods',
      menu: 'merchants',
    }, {
      title: 'Global Offers',
      path: '/offers',
      icon: 'tickets',
      menu: 'offers',
    }, {
      title: 'Feed Updates',
      path: '/feed-updates',
      icon: 'refresh-right',
      menu: 'feed-updates',
      children: rootGetters['feeds/feeds'].map(feed => ({
        title: feed.name,
        path: `/feed-updates/${feed.slug}`,
        menu: feed.slug,
      })),
    }, {
      title: 'Feed Activity',
      path: '/feed-activity',
      svg: 'activity',
      menu: 'feed-activity',
    }, {
      title: 'Log',
      path: '/log',
      svg: 'log',
      menu: 'log',
    }, {
      title: 'Categories',
      path: '/categories',
      svg: 'categories',
      menu: 'categories',
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
