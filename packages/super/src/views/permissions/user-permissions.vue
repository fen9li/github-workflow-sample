<script>
// fixme temporary, use default api processor in production
import Auth0ApiProcessor from '@loyalty-corp/manage-lib/processors/temp/auth0-api-processor'
import tableConfig from './permissions-table'

const { VUE_APP_AUTH0_DOMAIN } = process.env

export default {
  name: 'UserInfo',
  page: {
    title: 'User Information',
  },
  components: {
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      resourceServers: [],
      processor: new Auth0ApiProcessor({
        disableQueryString: true,
        component: this,
        path: `https://${VUE_APP_AUTH0_DOMAIN}/api/v2/users/${this.id}/permissions`,
      }),
      filters: tableConfig.filters,
      columns: tableConfig.columns,
    }
  },
  computed: {
  },
  created() {
  },
  methods: {
  },

}
</script>

<template>
  <table-layout
    :fragments="false"
    :hider="false"
    :exporter="false"
    table-name="userList"
    :processor="processor"
    :columns="columns"
    :filters="filters"
  >
    <el-button
      slot="actions"
      icon="el-icon-plus"
      circle
    />
  </table-layout>
</template>

<style lang="scss" module>
</style>
