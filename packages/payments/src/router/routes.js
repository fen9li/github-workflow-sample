import store from '@state/store'
import lazy from './meta-views/lazy-load'

export default [
  {
    path: '/',
    name: 'home',
    component: () => lazy(import('@views/home/home')),
  },
  {
    path: '/payment/transactions',
    name: 'payment-transactions',
    component: () => lazy(import('@views/transactions')),
  },
  {
    path: '/payment/transactions/:id',
    name: 'payment-transaction-details',
    component: () =>
      lazy(import('@views/transaction')),
    props: true,
  },
  {
    path: '/payment/settlements',
    name: 'payment-settlements',
    component: () => lazy(import('@views/settlements')),
  },
  {
    path: '/payment/settlements/:id',
    name: 'payment-settlement-details',
    component: () => lazy(import('@views/settlement')),
  },
  {
    path: '/customers',
    name: 'customers',
    component: () => lazy(import('@views/customers')),
  },
  {
    path: '/customers/:id',
    name: 'customer-details',
    redirect: {
      name: 'customer-information',
    },
    component: () => lazy(
      import('@views/customer')
    ),
    props: true,
    children: [
      {
        path: 'details',
        name: 'customer-information',
        component: () => lazy(
          import('@views/customer/customer-information')
        ),
        props: true,
      },
      {
        path: 'transactions',
        name: 'customer-transactions',
        component: () => lazy(
          import('@views/customer/transactions/customer-transactions')
        ),
        props: true,
      },
    ],
  },
  {
    path: '/products',
    name: 'products',
    component: () => lazy(import('@views/products')),
    redirect: { name: 'products-subscription' },
    children: [
      {
        path: 'subscription',
        name: 'products-subscription',
        component: () => lazy(
          import('@views/products/subscription')
        ),
      },
      {
        path: 'single',
        name: 'products-single',
        component: () => lazy(
          import('@views/products/single')
        ),
      },
    ],
  },
  {
    path: '/products/single/:id',
    name: 'products-single-details',
    component: () => lazy(
      import('@views/product-single')
    ),
    props: true,
  },
  {
    path: '/products/subscription/:id',
    name: 'products-subscription-details',
    component: () => lazy(
      import('@views/product-subscription')
    ),
    props: true,
  },
  {
    path: '/subscriptions',
    name: 'subscriptions',
    component: () => lazy(import('@views/subscriptions/subscriptions')),
  },
  {
    path: '/subscriptions/:id',
    name: 'subscription-details',
    redirect: { name: 'subscription-information' },
    component: () => lazy(import('@views/subscriptions/subscription-details')),
    props: true,
    children: [
      {
        path: 'details',
        name: 'subscription-information',
        component: () => lazy(
          import('@views/subscriptions/information/subscription-information')
        ),
        props: true,
      },
      {
        path: 'transactions',
        name: 'subscription-transactions',
        component: () => lazy(
          import('@views/subscriptions/transactions/subscription-transactions')
        ),
        props: true,
      },
    ],
  },
  {
    path: '/coupons',
    name: 'coupons',
    component: () => lazy(import('@views/coupons')),
  },
  {
    path: '/coupons/new',
    name: 'coupon-new',
    component: () => lazy(import('@views/coupons/coupon-new')),
  },
  {
    path: '/settings/payment',
    name: 'payment-settings',
    component: () => lazy(import('@views/settings-payment')),
  },
  {
    path: '/settings/notification',
    name: 'settings-notification',
    component: () => lazy(import('@views/settings-notification')),
  },
  {
    path: '/settings/business',
    name: 'settings-business',
    component: () => lazy(import('@views/settings-business')),
  },
  {
    path: '/settings/user-access',
    name: 'user-access',
    component: () => lazy(import('@views/user-access')),
  },
  {
    path: '/settings/templates',
    name: 'settings-templates',
    component: () => lazy(import('@views/settings-templates')),
  },
  {
    path: '/settings/history',
    name: 'settings-history',
    component: () => lazy(import('@views/log-history')),
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => lazy(import('@views/profile')),
    meta: {
      authRequired: true,
    },
    props: route => ({
      user: store.state.auth.currentUser || {},
    }),
  },
  {
    path: '/profile/:username',
    name: 'username-profile',
    component: () => lazy(import('@views/profile')),
    meta: {
      authRequired: true,
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
  },
  {
    path: '/404',
    name: '404',
    component: () => import('./meta-views/404'),
    // Allows props to be passed to the 404 page through route
    // params, such as `resource` to define what wasn't found.
    props: true,
  },
  // Redirect any unmatched routes to the 404 page. This may
  // require some server configuration to work in production:
  // https://router.vuejs.org/en/essentials/history-mode.html#example-server-configurations
  {
    path: '*',
    redirect: '404',
  },
]
