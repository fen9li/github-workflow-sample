const state = {}

const getters = {
  menu(state, getters, rootState, rootGetters) {
    return [{
      title: 'Dashboard',
      path: '/',
      icon: 'odometer',
      menu: 'dashboard',
    },{
      title: 'Providers',
      path: '/providers',
      icon: 'user',
      menu: 'providers',
    }, {
      title: 'Provider Products',
      path: '/provider-products',
      icon: 'document',
      menu: 'provider-products',
    }, {
      title: 'Suppliers',
      path: '/suppliers',
      icon: 'box',
      menu: 'suppliers',
    }, {
      title: 'Supplier Products',
      path: '/supplier-products',
      icon: 'circle-check',
      menu: 'supplier-products',
    }, {
      title: 'Contracts',
      path: '/contracts',
      icon: 'link',
      menu: 'contracts',
    }, {
      title: 'Product Categories',
      path: '/product-categories',
      icon: 'notebook-2',
      menu: 'product-categories',
    },]
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
