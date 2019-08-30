<script>
import table from './offers.table'

export default {
  name: 'Offers',
  page: {
    title: 'Offers',
  },
  data() {
    return {
      table: table(this)
    }
  },
  methods: {
    onRowClick(row) {
      this.$router.push({
        name: 'offer',
        params: { id: row.id, },
      })
    },
    getExportedFilename(row) {
      return false
    },
  }
}
</script>

<template>
  <main-layout title="Offers">
    <table-layout
      table-name="offers"
      :processor="table.processor"
      :filters="table.filters"
      :initial-filters="$route.params.filters"
      :columns="table.columns"
      :fragments="false"
      :quantity="[25, 50, 100, 200]"
      :export-filename="getExportedFilename"
      @row-click="onRowClick"
    />
  </main-layout>
</template>
