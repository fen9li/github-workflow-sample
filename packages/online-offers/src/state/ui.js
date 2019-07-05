
const state = {}

const getters = {
  menu(s, g, rs, rg) {
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
        children: rg['feeds/feeds'].map(item => {
          return {
            title: item.name,
            path: `/feed-updates/${item.slug}`,
          }
        }),
      },
      {
        title: 'Feed Status',
        path: '/feed-status',
        icon: 's-marketing',
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
