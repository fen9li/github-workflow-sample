<script>
import MainLayout from '@layouts/main/main-layout'
import TableLayout from '@layouts/table/table-layout'
import StaticProcessor from '@core/static-processor'
import tableConfig from './user-access-table'
import UserAccessAdd from './user-access-add.vue'

const userAccessMock = require('@mock-api/resources/user-access')

export default {
  name: 'UserAccess',
  page: {
    title: 'User Access',
  },
  components: {
    MainLayout,
    TableLayout,
    UserAccessAdd,
  },
  data() {
    return {
      processor: new StaticProcessor({
        component: this,
        data: userAccessMock.table,
      }),
      filters: tableConfig.filters,
      columns: tableConfig.columns,
    }
  },
}
</script>

<template>
  <main-layout title="User Access">
    <user-access-add slot="header" />
    <table-layout
      table-name="userAccess"
      :processor="processor"
      :filters="filters"
      :columns="columns"
    />
  </main-layout>
</template>
