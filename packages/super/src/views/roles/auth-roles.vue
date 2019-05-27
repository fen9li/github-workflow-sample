<script>
// fixme temporary, use default api processor in production
import Auth0ApiProcessor from '@loyalty-corp/manage-lib/processors/temp/auth0-api-processor'
import tableConfig from './roles-table'

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
        query: {
          hide: [
            'id',
          ],
        },
        component: this,
        path:
          (() => {
            const { $route: { name } = {} } = this
            if ( name === 'user-roles') {
              return `https://${VUE_APP_AUTH0_DOMAIN}/api/v2/users/${this.id}/roles`
            } else {
              return `https://${VUE_APP_AUTH0_DOMAIN}/api/v2/roles`
            }
          })(),
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
  <main-layout
    v-if="$route.name === 'roles'"
    title="Manage roles"
  >
    <table-layout
      :fragments="false"
      :hider="false"
      :exporter="false"
      table-name="RolesList"
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
  </main-layout>
  <table-layout
    v-else
    :fragments="false"
    :hider="false"
    :exporter="false"
    table-name="RolesList"
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
