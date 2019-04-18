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
          title: 'Home',
          path: '/',
          icon: 'news',
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
              title: 'Business Details',
              path: '/settings/business',
            },
            {
              title: 'Payment Settings',
              path: '/settings/payment',
            },
            {
              title: 'Notification Settings',
              path: '/settings/notification',
            },
            {
              title: 'User Access',
              path: '/settings/user-access',
            },
            {
              title: 'Templates',
              path: '/settings/templates',
            },
            {
              title: 'Log History',
              path: '/settings/history',
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
    v-if="loggedIn"
    :menu="menu"
    app-code="payments"
  >
    <router-view :key="$route.path" />
  </app-layout>
  <router-view v-else />
</template>

<!-- This should generally be the only global CSS in the app. -->
<style lang="scss">
@import './styles/index';

#nprogress .bar {
  background: $color-link-text;
}
</style>
