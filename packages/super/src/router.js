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
      component: () => lazy(import('./views/home')),
    },
    {
      path: '/settings/users',
      name: 'users',
      component: () => lazy(import('./views/users')),
    },
    {
      path: '/settings/users/:id',
      name: 'user',
      redirect: {
        name: 'user-info',
      },
      component: () => lazy(import('~/views/user')),
      props: true,
      children: [
        {
          path: 'info',
          name: 'user-info',
          component: () => lazy(import('~/views/user/info')),
          props: true,
        },
        {
          path: 'permissions',
          name: 'user-permissions',
          component: () => lazy(import('~/views/user/permissions')),
          props: true,
        },
      ],
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
})

export default router
