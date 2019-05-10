<script>
import ElasticProcessor from '@lib/processors/elastic-processor'
import tableConfig from './user-access-table'
import UserAccessAdd from './user-access-add.vue'

export default {
  name: 'UserAccess',
  page: {
    title: 'User Access',
  },
  components: {
    UserAccessAdd,
  },
  data() {
    return {
      processor: new ElasticProcessor({
        component: this,
        index: 'users',
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
