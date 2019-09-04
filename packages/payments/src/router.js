import Vue from 'vue'
import VueRouter from 'vue-router'
// https://github.com/declandewet/vue-meta
import VueMeta from 'vue-meta'
import store from '~/state/store'
import lazy from '@lib/router/lazy'

Vue.use(VueRouter)
Vue.use(VueMeta, {
  // The component option name that vue-meta looks for meta info on.
  keyName: 'page',
})

const router = new VueRouter({
  mode: 'history',
  // Use the HTML5 history API (i.e. normal-looking routes)
  // instead of routes with hashes (e.g. example.com/#/about).
  // This may require some server configuration in production:
  // https://router.vuejs.org/en/essentials/history-mode.html#example-server-configurations
  base: process.env.VUE_APP_BASE_URL,
  // Simulate native-like scroll behavior when navigating to a new
  // route and using back/forward buttons.
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {
        x: 0,
        y: 0
      }
    }
  },
  routes: [{
    path: '/signin',
    name: 'signin',
    component: () => lazy(import('~/views/auth/signin')),
  }, {
    path: '/',
    name: 'home',
    // component: () => lazy(import('~/views/home/home')),
    // temporary make transactions as home page
    redirect: {
      name: 'payment-transactions'
    }
  }, {
    path: '/transactions',
    name: 'payment-transactions',
    component: () => lazy(import('~/views/transactions')),
    meta: {
      menu: 'transactions',
    },
  }, {
    path: '/transactions/:id',
    name: 'transaction-details',
    component: () => lazy(import('~/views/transaction')),
    props: true,
    meta: {
      menu: 'transactions',
    },
  }, {
    path: '/settlements',
    name: 'payment-settlements',
    component: () => lazy(import('~/views/settlements')),
    meta: {
      menu: 'settlements',
    },
  }, {
    path: '/settlements/:id',
    name: 'payment-settlement-details',
    component: () => lazy(import('~/views/settlement')),
    props: true,
    meta: {
      menu: 'settlements',
    },
  }, {
    path: '/customers',
    name: 'customers',
    component: () => lazy(import('~/views/customers')),
    meta: {
      menu: 'customers',
    },
  }, {
    path: '/customers/:id',
    name: 'customer-details',
    redirect: {
      name: 'customer-information',
    },
    component: () => lazy(
      import('~/views/customer')
    ),
    props: true,
    meta: {
      menu: 'customers',
    },
    children: [{
      path: 'details',
      name: 'customer-information',
      component: () => lazy(
        import('~/views/customer/information')
      ),
      props: true,
      meta: {
        menu: 'customers',
      },
    }, {
      path: 'subscriptions',
      name: 'customer-subscriptions',
      component: () => lazy(
        import('~/views/customer/subscriptions')
      ),
      props: true,
      meta: {
        menu: 'customers',
      },
    }, {
      path: 'transactions',
      name: 'customer-transactions',
      component: () => lazy(
        import('~/views/customer/transactions')
      ),
      props: true,
      meta: {
        menu: 'customers',
      },
    }, ],
  }, {
    path: '/products',
    name: 'products',
    component: () => lazy(import('~/views/products')),
    redirect: {
      name: 'products-subscription'
    },
    meta: {
      menu: 'products',
    },
    children: [{
      path: 'subscription',
      name: 'products-subscription',
      component: () => lazy(
        import('~/views/products/subscription')
      ),
      meta: {
        menu: 'products',
      },
    }, {
      path: 'single',
      name: 'products-single',
      component: () => lazy(
        import('~/views/products/single')
      ),
      meta: {
        menu: 'products',
      },
    }, ],
  }, {
    path: '/products/single/:id',
    name: 'products-single-details',
    component: () => lazy(
      import('~/views/product-single')
    ),
    props: true,
    meta: {
      menu: 'products',
    },
  }, {
    path: '/products/subscription/:id',
    name: 'products-subscription-details',
    component: () => lazy(
      import('~/views/product-subscription')
    ),
    props: true,
    meta: {
      menu: 'products',
    },
  }, {
    path: '/subscriptions',
    name: 'subscriptions',
    component: () => lazy(import('~/views/subscriptions')),
    meta: {
      menu: 'subscriptions',
    },
  }, {
    path: '/subscriptions/:id',
    name: 'subscription-details',
    redirect: {
      name: 'subscription-information'
    },
    component: () => lazy(import('~/views/subscription')),
    props: true,
    meta: {
      menu: 'subscriptions',
    },
    children: [{
      path: 'details',
      name: 'subscription-information',
      component: () => lazy(
        import('~/views/subscription/information')
      ),
      props: true,
      meta: {
        menu: 'subscriptions',
      },
    }, {
      path: 'transactions',
      name: 'subscription-transactions',
      component: () => lazy(
        import('~/views/subscription/transactions')
      ),
      props: true,
      meta: {
        menu: 'subscriptions',
      },
    }, ],
  }, {
    path: '/coupons',
    name: 'coupons',
    component: () => lazy(import('~/views/coupons')),
    meta: {
      menu: 'coupons',
    },
  }, {
    path: '/coupons/:id',
    name: 'coupon-details',
    component: () => lazy(import('~/views/coupon')),
    props: true,
    meta: {
      menu: 'coupons',
    },
  }, {
    path: '/settings/payment',
    name: 'payment-settings',
    component: () => lazy(import('~/views/settings-payment')),
    props: true,
    meta: {
      nested: true,
      menu: 'settings',
      submenu: 'settings-payment',
    },
  }, {
    path: '/settings/notification',
    name: 'settings-notification',
    component: () => lazy(import('~/views/settings-notification')),
    props: true,
    meta: {
      nested: true,
      menu: 'settings',
      submenu: 'settings-notification',
    },
  }, {
    path: '/settings/business',
    name: 'settings-business',
    component: () => lazy(import('~/views/settings-business')),
    props: true,
    meta: {
      nested: true,
      menu: 'settings',
      submenu: 'settings-business',
    },
  }, {
    path: '/settings/user-access',
    name: 'user-access',
    component: () => lazy(import('~/views/user-access')),
    props: true,
    meta: {
      nested: true,
      menu: 'settings',
      submenu: 'settings-user-access',
    },
  }, {
    path: '/settings/templates',
    name: 'settings-templates',
    component: () => lazy(import('~/views/settings-templates')),
    props: true,
    meta: {
      nested: true,
      menu: 'settings',
      submenu: 'settings-templates',
    },
  }, {
    path: '/settings/log-history',
    name: 'settings-log-history',
    component: () => lazy(import('~/views/log-history')),
    props: true,
    meta: {
      nested: true,
      menu: 'settings',
      submenu: 'settings-log-history',
    },
  }, {
    path: '/settings/log-details/:id',
    name: 'log-details',
    component: () => lazy(import('~/views/log-details')),
    props: true,
    meta: {
      nested: true,
      menu: 'settings',
      submenu: 'settings-log-history',
    },
  }, {
    path: '/settings/events',
    name: 'settings-events',
    component: () => lazy(import('~/views/events')),
    props: true,
    meta: {
      nested: true,
      menu: 'settings',
      submenu: 'settings-events',
    },
  }, {
    path: '/settings/event-details/:id',
    name: 'event-details',
    component: () => lazy(import('~/views/event')),
    props: true,
    meta: {
      nested: true,
      menu: 'settings',
      submenu: 'settings-events',
    },
  }, {
    path: '/settings/webhooks',
    name: 'settings-webhooks',
    component: () => lazy(import('~/views/webhooks')),
    props: true,
    meta: {
      nested: true,
      menu: 'settings',
      submenu: 'settings-webhooks',
    },
  }, {
    path: '/settings/webhook-details/:id',
    name: 'webhook-details',
    component: () => lazy(import('~/views/webhook')),
    props: true,
    meta: {
      nested: true,
      menu: 'settings',
      submenu: 'settings-webhooks',
    },
  }, {
    path: '/settings/webhook-attempts',
    name: 'settings-webhook-attempts',
    component: () => lazy(import('~/views/webhook-attempts')),
    props: true,
    meta: {
      nested: true,
      menu: 'settings',
      submenu: 'settings-webhook-attempts',
    },
  }, {
    path: '/settings/webhook-attempt/:id',
    name: 'settings-webhook-attempt',
    component: () => lazy(import('~/views/webhook-attempt')),
    props: true,
    meta: {
      nested: true,
      menu: 'settings',
      submenu: 'settings-webhook-attempts',
    },
  }, {
    path: '/profile',
    name: 'profile',
    component: () => lazy(import('~/views/profile')),
    meta: {
      authRequired: true,
      menu: 'profile',
    },
    props: route => ({
      user: store.state.auth.currentUser || {},
    }),
  }, {
    path: '/profile/:username',
    name: 'username-profile',
    component: () => lazy(import('~/views/profile')),
    meta: {
      authRequired: true,
      menu: 'profile',
      beforeResolve(routeTo, routeFrom, next) {
        store
          // Try to fetch the user's information by their username
          .dispatch('users/fetchUser', {
            username: routeTo.params.username,
          })
          .then(user => {
            // Add the user to the route params, so that it can
            // be provided as a prop for the view component below.
            routeTo.params.user = user
            // Continue to the route.
            next()
          })
          .catch(() => {
            // If a user with the provided username could not be
            // found, redirect to the 404 page.
            next({
              name: '404',
              params: {
                resource: 'User',
              },
            })
          })
      },
    },
    // Set the user from the route params, once it's set in the
    // beforeResolve route guard.
    props: route => ({
      user: route.params.user,
    }),
  }, ],
  // Redirect any unmatched routes to the 404 page. This may
  // require some server configuration to work in production:
  // https://router.vuejs.org/en/essentials/history-mode.html#example-server-configurations
  // {
  //   path: '*',
  //   redirect: '404',
  // },
})

export default router
