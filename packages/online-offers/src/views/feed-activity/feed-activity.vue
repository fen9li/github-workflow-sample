<script>
import statusTable from './feed-activity.table.js'

export default {
  name: 'FeedActivity',
  page: {
    title: 'Feed Activity',
  },
  data() {
    return {
      table: statusTable(this),
    }
  },
}
</script>

<template>
  <main-layout title="Activity">
    <table-layout
      hider
      table-name="feed-activity"
      :processor="table.processor"
      :filters="table.filters"
      :columns="table.columns"
      :fragments="false"
      :quantity="false"
    />
  </main-layout>
</template>
