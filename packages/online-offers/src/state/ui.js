
const state = {}

const getters = {
  menu(state, getters, rootState, rootGetters) {
    return [
      {
        title: 'Clients',
        path: '/clients',
        icon: 'user',
      },
      {
        title: 'Global Merchants',
        path: '/merchants',
        icon: 'goods',
      },
      {
        title: 'Global Offers',
        path: '/offers',
        icon: 'tickets',
      },
      {
        title: 'Feed Updates',
        path: '/feed-updates',
        icon: 'refresh-right',
        children: rootGetters['feeds/feeds'].map(feed => ({
          title: feed.name,
          path: `/feed-updates/${feed.slug}`,
          slug: feed.slug,
        })),
      },
      {
        title: 'Feed Activity',
        path: '/feed-activity',
        icon: 's-data',
      },
      {
        title: 'Log',
        path: '/log',
        icon: 'notebook-2',
      },
      {
        title: 'Categories',
        path: '/categories',
        icon: 'refresh-left',
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
