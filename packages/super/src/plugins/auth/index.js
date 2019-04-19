import get from 'lodash/get'
import authService from './auth.service'
import authState from './auth.state'

export default {
  install(Vue, options) {
    const { router, store } = options
    /*
     * Register auth service in Vue instance
     * and add handling for login event
     */
    Vue.prototype.$auth = authService

    Vue.mixin({
      created() {
        if (this.handleLoginEvent) {
          authService.addListener('loginEvent', this.handleLoginEvent)
        }
      },

      destroyed() {
        if (this.handleLoginEvent) {
          authService.removeListener('loginEvent', this.handleLoginEvent)
        }
      },
    })

    /*
     * Register auth state
     */
    if (store) {
      store.registerModule('auth', authState)

      authService.addListener('loginEvent', e => {
        const profile = e.loggedIn ? e.profile : null
        store.commit('auth/SET_PROFILE', profile)
      })
    }

    /*
     * Create auth routes
     */
    if (router) {
      router.addRoutes([
        {
          path: '/login',
          name: 'login',
          beforeEnter(to, from, next) {
            authService.renewTokens()
              .then(() => {
                next(get(to, 'params.targetPath', '/'))
              })
              .catch(() => {
                authService.login()
              })
          },
        },
        {
          path: '/logout',
          name: 'logout',
          component: () => import('./auth-logout'),
        },
        {
          path: '/callback',
          name: 'callback',
          component: () => import('./auth-callback'),
        },
      ])

      router.beforeEach((to, from, next) => {
        if (
          /callback|login|logout/.test(to.path) ||
          authService.isAuthenticated()
        ) {
          return next()
        }

        next({
          name: 'login',
          params: {
            targetPath: to.fullPath,
          },
        })
      })
    }
  },
}
