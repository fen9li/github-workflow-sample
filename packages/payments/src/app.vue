<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('auth', [
      'loggedIn',
    ]),
    menu() {
      return [
        {
          title: 'Dashboard',
          path: '/',
          icon: 'odometer',
        },
        {
          title: 'Transactions',
          path: '/payment/transactions',
          icon: 'sort',

        },
        {
          title: 'Settlements',
          path: '/payment/settlements',
          icon: 'view',
        },
        {
          title: 'Customers',
          path: '/customers',
          icon: 'service',
        },
        {
          title: 'Products',
          path: '/products/subscription',
          icon: 'goods',
        },
        {
          title: 'Subscriptions',
          path: '/subscriptions',
          icon: 'goods',
        },
        {
          title: 'Coupons',
          path: '/coupons',
          icon: 'tickets',
        },
        {
          title: 'Settings',
          path: '/settings',
          icon: 'setting',
          children: [
            {
              title: 'Payment Settings',
              path: '/settings/payment',
            },
            {
              title: 'Webhooks',
              path: '/settings/webhooks',
            },
            {
              title: 'Webhook Attempts',
              path: '/settings/webhook-attempts',
            },
            {
              title: 'Events',
              path: '/settings/events',
            },
            {
              title: 'Log History',
              path: '/settings/log-history',
            },
          ],
        },
      ]
    },
  },
}
</script>

<template>
  <app-layout
    :menu="menu"
    app-code="payments"
  >
    <router-view :key="$route.path" />
  </app-layout>
</template>
