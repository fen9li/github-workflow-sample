<script>
// fixme temporary, use this.$api in production
import { API } from '@loyalty-corp/manage-lib/processors/temp/auth0-api-processor'

export default {
  name: 'ApiEndpoint',
  page: {
    title: 'Protected API endpoint',
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      endpointData: {
      },
    }
  },
  computed: {
    tabs() {
      return [
        {
          label: 'Information',
          route: {
            name: 'endpoint-info',
          },
        },
        {
          label: 'Permissions',
          route: {
            name: 'endpoint-permissions',
          },
        },
        {
          label: 'Roles',
          route: {
            name: 'endpoint-roles',
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
        const { data } = await API.get(`https://${VUE_APP_AUTH0_DOMAIN}/api/v2/resource-servers/${id}`)
        this.endpointData = data
      } catch (exception) {
        console.log(exception)
      }
    },
  },
}
</script>

<template>
  <main-layout
    :title="`${endpointData.name} [ ${endpointData.identifier} ]`"
    :tabs="tabs"
    back
  >
    <router-view :endpoint-data="endpointData" />
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
