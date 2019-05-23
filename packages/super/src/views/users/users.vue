<script>
import Auth0ApiProcessor from '@lib/processors/temp/auth0-api-processor'
import tableConfig from './users-table'

const { VUE_APP_AUTH0_DOMAIN } = process.env

export default {
  name: 'UserManagement',
  page: {
    title: 'User management',
  },
  data() {
    return {
      processor: new Auth0ApiProcessor({
        disableQueryString: true,
        query: {
          hide: [
            'user_id',
          ],
        },
        component: this,
        path: `https://${VUE_APP_AUTH0_DOMAIN}/api/v2/users`,
      }),
      filters: tableConfig.filters,
      columns: tableConfig.columns,
    }
  },
  methods: {
    onRowClick(row) {
      this.$router.push({
        name: 'user',
        params: {
          id: row.user_id || 'unknown',
        },
      })
    },
  },
}
</script>

<template>
  <main-layout title="Manage users and roles">
    <table-layout
      :fragments="false"
      :hider="false"
      :exporter="false"
      table-name="userList"
      :processor="processor"
      :columns="columns"
      :filters="filters"
      @row-click="onRowClick"
    >
    </table-layout>
  </main-layout>
</template>
