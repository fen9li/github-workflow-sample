<script>
// import appConfig from '~/app.config'
import { API } from '@loyalty-corp/manage-lib/processors/temp/auth0-api-processor'

export default {
  name: 'UserProfile',
  page: {
    title: 'User Profile',
    // meta: [{ name: 'description', content: appConfig.description }],
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      userData: {
      },
    }
  },
  computed: {
    tabs() {
      return [
        {
          label: 'Information',
          route: {
            name: 'user-info',
          },
        },
        {
          label: 'Permissions',
          route: {
            name: 'user-permissions',
          },
        },
      ]
    },
  },
  created() {
    this.getData()
  },
  methods: {
    async getData() {
      const { VUE_APP_AUTH0_DOMAIN } = process.env
      const { id } = this
      try {
        const { data } = await API.get(`https://${VUE_APP_AUTH0_DOMAIN}/api/v2/users/${id}`)
        this.userData = data
      } catch (exception) {
        console.log(exception)
      }
    },
  },
}
</script>

<template>
  <main-layout
    title="User"
    :tabs="tabs"
    back
  >
    <router-view :user-data="userData" />
  </main-layout>
</template>

<style lang="scss" module>


.balance {
  display: flex;
}

.total {
  display: flex;
  flex-direction: row;
  align-items: center;
  /*justify-content: center;*/
  /*margin-top: 2rem;*/
  /*margin-left: 5rem;*/
  /*text-align: right;*/
}

.owing {
  color: var(--color-error);
}

.balanceCount {
  margin-bottom: .5rem;
  font-size: 1.5rem;
}
</style>
