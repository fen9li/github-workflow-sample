import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: {
        name: 'applications'
      }
    },
    {
      path: '/applications',
      name: 'applications',
      component: () => import('./views/applications')
    },
  ]
})

export default router
