import authService from './auth.service'

export default {
  install(Vue, options) {
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
      }
    })

    /*
     * Create auth routes
     */
    if (options.router) {
      options.router.addRoutes([
        {
          path: '/login',
          name: 'login',
          component: () => import('./auth-login'),
          props: true,
        },
        {
          path: '/logout',
          name: 'logout',
          component: () => import('./auth-logout')
        },
        {
          path: '/callback',
          name: 'callback',
          component: () => import('./auth-callback')
        }
      ])

      options.router.beforeEach((to, from, next) => {
        if (/callback|login|logout/.test(to.path) || authService.isAuthenticated()) {
          return next()
        }

        next({ name: 'login' })
      })
    }
  }
}
