<script>
import table from './products-single-table'

export default {
  name: 'ProductsSingle',
  page: {
    title: 'Single Products',
  },
  props: {
    updateTable: {
      type: Boolean,
      required: true,
    }
  },
  data() {
    return {
      table: table(this),
    }
  },
  watch: {
    updateTable(newVal) {
      if(newVal) {
        this.table.processor.getData()
        this.$emit('update:updateTable', false)
      }
    }
  },
  methods: {
    onRowClick(row) {
      this.$router.push({
        name: 'products-single-details',
        params: { id: row.id },
      })
    },
  },
}
</script>

<template>
  <div>
    <table-layout
      table-name="singleProducts"
      :processor="table.processor"
      :filters="table.filters"
      :columns="table.columns"
      :fragments="false"
      @row-click="onRowClick"
    />
  </div>
</template>
