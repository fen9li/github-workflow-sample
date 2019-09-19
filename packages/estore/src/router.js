import Vue from 'vue'
import Router from 'vue-router'
import lazy from '@lib/router/lazy'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.VUE_APP_BASE_URL,
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: () => lazy(import('./views/dashboard')),
      meta: {
        menu: 'dashboard',
      },
    },
    {
      path: '/providers',
      name: 'providers',
      component: () => lazy(import('./views/providers')),
      meta: {
        menu: 'providers',
      },
    },
    {
      path: '/providers/:id',
      name: 'provider-details',
      component: () => lazy(import('./views/provider')),
      meta: {
        menu: 'providers',
      },
      props: true
    },
    {
      path: '/provider-products',
      name: 'provider-products',
      component: () => lazy(import('./views/provider-products')),
      meta: {
        menu: 'provider-products',
      },
    },
    {
      path: '/suppliers',
      name: 'suppliers',
      component: () => lazy(import('./views/suppliers')),
      meta: {
        menu: 'suppliers',
      },
    },
    {
      path: '/supplier-products',
      name: 'supplier-products',
      component: () => lazy(import('./views/supplier-products')),
      meta: {
        menu: 'supplier-products',
      },
    },
    {
      path: '/contracts',
      name: 'contracts',
      component: () => lazy(import('./views/contracts')),
      meta: {
        menu: 'contracts',
      },
    },
    {
      path: '*',
      redirect: '/',
    }
  ],
})

export default router
