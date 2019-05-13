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
      path: '/offers',
      name: 'offers',
      component: () => lazy(import('./views/offers')),
    },
    {
      path: '/clients',
      name: 'clients',
      component: () => lazy(import('./views/clients')),
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
})

export default router
