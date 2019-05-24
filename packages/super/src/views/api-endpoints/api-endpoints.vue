<script>
import Auth0ApiProcessor from '@lib/processors/temp/auth0-api-processor'
import tableConfig from './endpoints-table'

const { VUE_APP_AUTH0_DOMAIN } = process.env

export default {
  name: 'AuthApiEndpoints',
  page: {
    title: 'Auth api endpoints',
  },
  data() {
    return {
      processor: new Auth0ApiProcessor({
        disableQueryString: true,
        query: {
          hide: [
            'id',
            'allow_offline_access',
            'skip_consent_for_verifiable_first_party_clients',
            'enforce_policies',
            'token_dialect',
          ],
        },
        component: this,
        path: `https://${VUE_APP_AUTH0_DOMAIN}/api/v2/resource-servers`,
      }),
      filters: tableConfig.filters,
      columns: tableConfig.columns,
    }
  },
  methods: {
    onRowClick(row) {
      this.$router.push({
        name: 'api-endpoint',
        params: {
          id: row.id || 'unknown',
        },
      })
    },
  },
}
</script>

<template>
  <main-layout title="Manage protected API endpoints, their permissions and roles">
    <table-layout
      :fragments="false"
      table-name="AuthApiEndpoints"
      :processor="processor"
      :columns="columns"
      :filters="filters"
      @row-click="onRowClick"
    />
  </main-layout>
</template>
