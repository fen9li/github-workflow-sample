import get from 'lodash/get'
import NProgress from 'nprogress/nprogress'
import authService from '../auth/auth.service'

export default {
  install(Vue, options = {}) {
    const { router } = options

    if (!router) return

    router.addRoutes([
      {
        path: '/login',
        name: 'login',
        beforeEnter(to, from, next) {
          authService.renewTokens()
            .then(() => {
              next(get(to, 'params.targetPath', {
                name: 'home',
              }))
            })
            .catch(() => {
              authService.login()
            })
        },
      },
      {
        path: '/logout',
        name: 'logout',
        component: () => import('../auth/auth-logout'),
      },
      {
        path: '/callback',
        name: 'callback',
        component: () => import('../auth/auth-callback'),
      },
      {
        path: '/forbidden',
        name: 'forbidden',
        component: () => import('../auth/auth-forbidden'),
        beforeEnter(to, from, next) {
          if (authService.isAuthenticated() && !authService.isAuthorized()) next()
          else next({ name: 'login' })
        },
      },
      {
        path: '/404',
        name: '404',
        component: () => import('./views/404'),
        // Allows props to be passed to the 404 page through route
        // params, such as `resource` to define what wasn't found.
        props: true,
      },
    ])

    router.beforeEach((to, from, next) => {
      if (
        /callback|login|logout|forbidden/.test(to.path)
      ) {
        return next()
      }

      if (authService.isAuthenticated()) {
        return authService.isAuthorized() ?
          next() : next({ name: 'forbidden' })
      }

      next({
        name: 'login',
        params: {
          targetPath: to.fullPath,
        },
      })
    })


    // Before each route evaluates...
    router.beforeEach((routeTo, routeFrom, next) => {
      // If this isn't an initial page load...
      if (routeFrom.name !== null) {
        // Start the route progress bar.
        NProgress.start()
      }

      next()
    })

    router.beforeResolve(async (routeTo, routeFrom, next) => {
      // Create a `beforeResolve` hook, which fires whenever
      // `beforeRouteEnter` and `beforeRouteUpdate` would. This
      // allows us to ensure data is fetched even when params change,
      // but the resolved route does not. We put it in `meta` to
      // indicate that it's a hook we created, rather than part of
      // Vue Router (yet?).
      try {
        // For each matched route...
        for (const route of routeTo.matched) {
          await new Promise((resolve, reject) => {
            // If a `beforeResolve` hook is defined, call it with
            // the same arguments as the `beforeEnter` hook.
            if (route.meta && route.meta.beforeResolve) {
              route.meta.beforeResolve(routeTo, routeFrom, (...args) => {
                // If the user chose to redirect...
                if (args.length) {
                  // If redirecting to the same route we're coming from...
                  if (routeFrom.name === args[0].name) {
                    // Complete the animation of the route progress bar.
                    NProgress.done()
                  }
                  // Complete the redirect.
                  next(...args)
                  reject(new Error('Redirected'))
                } else {
                  resolve()
                }
              })
            } else {
              // Otherwise, continue resolving the route.
              resolve()
            }
          })
        }
        // If a `beforeResolve` hook chose to redirect, just return.
      } catch (error) {
        return
      }

      // If we reach this point, continue resolving the route.
      next()
    })

    // When each route is finished evaluating...
    router.afterEach((routeTo, routeFrom) => {
      // Complete the animation of the route progress bar.
      NProgress.done()
    })
  },
}
