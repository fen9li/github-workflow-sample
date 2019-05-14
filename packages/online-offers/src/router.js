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
      name: 'home',
      component: () => lazy(import('./views/Home')),
    },
    {
      path: '/clients',
      name: 'clients',
      component: () => lazy(import('./views/clients')),
    },
    {
      path: '/merchants',
      name: 'merchants',
      component: () => lazy(import('./views/merchants')),
    },
    {
      path: '/merchants/:slug',
      name: 'merchant-details',
      component: () => lazy(import('./views/merchant')),
      props: true,
    },
    {
      path: '/merchants/:slug/offers',
      name: 'merchant-offers',
      component: () => lazy(import('./views/merchant-offers')),
      props: true,
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
})

export default router
