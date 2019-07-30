<script>
import ElasticProcessor from '@lib/processors/elastic-processor'
import table from './user-access-table'
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

      filters: table.filters,
      columns: table.columns,
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
