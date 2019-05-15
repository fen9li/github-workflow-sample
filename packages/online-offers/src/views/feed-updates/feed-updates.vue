<script>
import table from './feed-updates.table.js'

export default {
  name: 'FeedUpdates',
  page: {
    title: 'Feed Updates',
  },
  data() {
    return {
      table: table(this),
    }
  },
  methods: {
    onRowClick(row) {
      //
    },
  },
}
</script>

<template>
  <main-layout title="Feed Updates">
    <table-layout
      table-name="feed-updates"
      :processor="table.processor"
      :filters="table.filters"
      :columns="table.columns"
      :fragments="false"
      :hider="false"
      quantity
      @row-click="onRowClick"
    />
  </main-layout>
</template>
