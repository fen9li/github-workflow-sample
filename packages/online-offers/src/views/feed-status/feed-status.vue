<script>
import table from './feed-status.table.js'

export default {
  name: 'FeedStatus',
  page: {
    title: 'Feed Status',
  },
  data() {
    return {
      table: table(this),
    }
  },
}
</script>

<template>
  <main-layout title="Activity">
    <table-layout
      table-name="feed-status"
      :processor="table.processor"
      :filters="table.filters"
      :columns="table.columns"
      :fragments="false"
      :hider="false"
      quantity
    />
  </main-layout>
</template>
