import Vue from 'vue'
import Router from 'vue-router'
import lazy from '@lib/router/lazy'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.VUE_APP_BASE_URL,
  routes: [{
    path: '/',
    name: 'home',
    component: () => lazy(import('./views/dashboard')),
    meta: {
      menu: 'dashboard',
    },
  }, {
    path: '/users',
    name: 'users',
    component: () => lazy(import('./views/users')),
    meta: {
      menu: 'users',
    },
  }, {
    path: '/user/:id',
    name: 'user',
    component: () => lazy(import('./views/user')),
    props: true,
    meta: {
      menu: 'users',
    },
  }, {
    path: '/user/create',
    name: 'user-create',
    component: () => lazy(import('./views/user/form')),
    meta: {
      menu: 'users',
    },
  }, {
    path: '/user/edit/:id',
    name: 'user-edit',
    component: () => lazy(import('./views/user/form')),
    props: true,
    meta: {
      menu: 'users',
    },
  }, {
    path: '/providers',
    name: 'providers',
    component: () => lazy(import('./views/providers')),
    meta: {
      menu: 'providers',
    },
  }, {
    path: '/providers/create',
    name: 'provider-create',
    component: () => lazy(import('./views/provider')),
    props: true,
    meta: {
      create: true,
      menu: 'providers',
    },
  }, {
    path: '/providers/:id/:edit?',
    name: 'provider-details',
    component: () => lazy(import('./views/provider')),
    props: true,
    meta: {
      menu: 'providers',
    },
  }, {
    path: '/products',
    name: 'products',
    component: () => lazy(import('./views/products')),
    meta: {
      menu: 'products',
    },
  }, {
    path: '/products/:id',
    redirect: '/products/:id/info',
    meta: {
      menu: 'products',
    },
  }, {
    path: '/products/:id/:activeTab',
    name: 'product-details',
    component: () => lazy(import('./views/product/product.vue')),
    props: true,
    meta: {
      menu: 'products',
    },
  }, {
    path: '/products/:id/version/:versionId',
    name: 'product-version',
    component: () => lazy(import('./views/product/product-version.vue')),
    props: true,
    meta: {
      menu: 'products',
    },
  }, {
    path: '/roles',
    name: 'roles',
    component: () => lazy(import('./views/roles')),
    meta: {
      menu: 'roles',
    },
  }, {
    path: '/role/:id',
    name: 'role',
    component: () => lazy(import('./views/roles/role')),
    meta: {
      menu: 'roles',
    },
  }, {
    path: '/logs',
    name: 'logs',
    component: () => lazy(import('./views/logs')),
    meta: {
      menu: 'logs',
    },
  }, {
    path: '/log/:id',
    name: 'log-details',
    props: true,
    component: () => lazy(import('./views/logs/log')),
    meta: {
      menu: 'logs',
    },
  }, {
    path: '/settings',
    name: 'settings',
    component: () => lazy(import('./views/settings')),
    meta: {
      menu: 'settings',
    },
  }, {
    path: '*',
    redirect: '/',
  }, ],
})

export default router
