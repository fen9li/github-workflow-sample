<script>
import statusTable from './log.table.js'

export default {
  name: 'Log',
  page: {
    title: 'Log',
  },
  data() {
    return {
      table: statusTable(this),
    }
  },
}
</script>

<template>
  <main-layout title="Log">
    <table-layout
      hider
      table-name="log"
      :processor="table.processor"
      :filters="table.filters"
      :columns="table.columns"
      :fragments="false"
      :quantity="false"
    />
  </main-layout>
</template>
