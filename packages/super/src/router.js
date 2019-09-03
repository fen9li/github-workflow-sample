import Vue from 'vue'
import Router from 'vue-router'
import lazy from '@lib/router/lazy'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.VUE_APP_BASE_URL,
  linkActiveClass: 'menu__item--active',
  linkExactActiveClass: 'menu__item--active',
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => lazy(import('./views/dashboard')),
    },
    {
      path: '/users',
      name: 'users',
      component: () => lazy(import('./views/users')),
    },
    {
      path: '/user/:id',
      name: 'user',
      component: () => lazy(import('./views/users/user')),
      props: true,
    },
    {
      path: '/user/create',
      name:'user-create',
      component: () => lazy(import('./views/users/form')),
    },
    {
      path: '/user/edit/:id',
      name:'user-edit',
      component: () => lazy(import('./views/users/form')),
      props: true,
    },
    {
      path: '/providers',
      name: 'providers',
      component: () => lazy(import('./views/providers')),
    },
    {
      path: '/providers/create',
      name: 'provider-create',
      component: () => lazy(import('./views/provider')),
      props: true,
      meta: {
        create: true,
      },
    },
    {
      path: '/providers/:id/:edit?',
      name: 'provider-details',
      component: () => lazy(import('./views/provider')),
      props: true,
    },
    {
      path: '/products',
      name: 'products',
      component: () => lazy(import('./views/products')),
    },
    {
      path: '/roles',
      name: 'roles',
      component: () => lazy(import('./views/roles')),
    },
    {
      path: '/role/:id',
      name: 'role',
      component: () => lazy(import('./views/roles/role')),
    },
    {
      path: '/logs',
      name: 'logs',
      component: () => lazy(import('./views/logs')),
    },
    {
      path: '/log/:id',
      name: 'log-details',
      component: () => lazy(import('./views/logs/log')),
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => lazy(import('./views/settings')),
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
})

export default router
