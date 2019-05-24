<script>
// fixme temporary, use this.$api in production
import { API } from '@loyalty-corp/manage-lib/processors/temp/auth0-api-processor'

export default {
  name: 'UserProfile',
  page: {
    title: 'User Profile',
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
        {
          label: 'Roles',
          route: {
            name: 'user-roles',
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
    :title="userData.name"
    :tabs="tabs"
    back
  >
    <div
      slot="beforeTitle"
      :class="$style.caption"
    >
      <img
        :class="$style.ava"
        :src="userData.picture"
      >
    </div>
    <router-view :user-data="userData" />
  </main-layout>
</template>

<style lang="scss" module>
  .ava {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    margin-right: 0.5rem;
  }
</style>
