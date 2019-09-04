<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('auth', [
      'loggedIn',
    ]),
    menu() {
      return [
        // temporary hide dashboard and make transactions as home page
        // {
        //   title: 'Dashboard',
        //   path: '/',
        //   icon: 'odometer',
        // },
        {
          title: 'Transactions',
          path: '/transactions',
          icon: 'sort',
          menu: 'transactions',
        },
        {
          title: 'Settlements',
          path: '/settlements',
          icon: 'view',
          menu: 'settlements',
        },
        {
          title: 'Customers',
          path: '/customers',
          icon: 'service',
          menu: 'customers',
        },
        {
          title: 'Products',
          path: '/products/subscription',
          icon: 'goods',
          menu: 'products',
        },
        {
          title: 'Subscriptions',
          path: '/subscriptions',
          icon: 'goods',
          menu: 'subscriptions',
        },
        {
          title: 'Coupons',
          path: '/coupons',
          icon: 'tickets',
          menu: 'coupons',
        },
        {
          title: 'Settings',
          icon: 'setting',
          menu: 'settings',
          children: [
            {
              title: 'Payment Settings',
              path: '/settings/payment',
              menu: 'settings-payment',
            },
            // {
            //   title: 'Notification Settings',
            //   path: '/settings/notification',
            //   menu: 'settings-notification',
            // },
            // {
            //   title: 'Business Details',
            //   path: '/settings/business',
            //   menu: 'settings-business',
            // },
            // {
            //   title: 'User Access',
            //   path: '/settings/user-access',
            //   menu: 'settings-user-access',
            // },
            // {
            //   title: 'Templates',
            //   path: '/settings/templates',
            //   menu: 'settings-templates',
            // },
            {
              title: 'Webhooks',
              path: '/settings/webhooks',
              menu: 'settings-webhooks',
            },
            {
              title: 'Webhook Attempts',
              path: '/settings/webhook-attempts',
              menu: 'settings-webhook-attempts',
            },
            {
              title: 'Events',
              path: '/settings/events',
              menu: 'settings-events',
            },
            {
              title: 'Log History',
              path: '/settings/log-history',
              menu: 'settings-log-history',
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
    link-click-open
  >
    <router-view :key="$route.path" />
  </app-layout>
</template>
