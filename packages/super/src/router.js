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
      path: '/auth/users',
      name: 'users',
      component: () => lazy(import('./views/users')),
    },
    {
      path: '/auth/users/:id',
      name: 'user',
      redirect: {
        name: 'user-info',
      },
      component: () => lazy(import(
        '~/views/users/user'
      )),
      props: true,
      children: [
        {
          path: 'info',
          name: 'user-info',
          component: () => lazy(import(
            '~/views/users/user/info'
          )),
          props: true,
        },
        {
          path: 'permissions',
          name: 'user-permissions',
          component: () => lazy(import(
            '~/views/permissions'
          )),
          props: true,
        },
        {
          path: 'roles',
          name: 'user-roles',
          component: () => lazy(import(
            '~/views/roles'
          )),
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
