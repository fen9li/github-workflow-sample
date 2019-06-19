<script>
import { mapGetters } from 'vuex'
import get from 'lodash/get'
import axios from 'axios' // Just as idea. Better to move request somewhere

export const API = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  auth: {
    username: process.env.VUE_APP_API_AUTH,
  },
})

export default {
  name: 'SuperApp',
  data() {
    return {
      feedsData: [],
    }
  },
  computed: {
    ...mapGetters('auth', [
      'loggedIn',
    ]),
    feeds() {
      return get(this.feedsData, 'data.items', []).map(item => {
        return {
          title: item.name,
          path: `/feed-updates/${item.slug}`,
        }
      })
    },
    menu() {
      return [
        {
          title: 'Clients',
          path: '/clients',
          icon: 'user',
        },
        {
          title: 'Global Merchants',
          path: '/merchants',
          icon: 'goods',
        },
        {
          title: 'Feed Updates',
          path: '/feed-updates',
          icon: 'refresh-right',
          children: this.feeds,
        },
        {
          title: 'Feed Status',
          path: '/feed-status',
          icon: 's-marketing',
        },
      ]
    },
  },
  async created() {
    this.feedsData = await API.get('/feeds')
  },
}
</script>

<template>
  <app-layout
    id="app"
    :menu="menu"
    title="Online Offers"
  >
    <router-view />
  </app-layout>
</template>

<!-- This should generally be the only global CSS in the app. -->
<style lang="scss">

#nprogress .bar {
  background: var(--color-link);
}

</style>
