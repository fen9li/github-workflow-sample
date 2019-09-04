<script>
import RolesTabTable from './roles-tab.table.js'

export default {
  name: 'ProductRolesTab',
  data() {
    return {
      table: RolesTabTable(this),
    }
  },
  methods: {
    onRowClick(row) {
      this.$router.push({
        name: 'role',
        params: {
          id: row.id,
        }
      })
    }
  }
}
</script>

<template>
  <table-layout
    table-name="product-roles"
    :processor="table.processor"
    :filters="table.filters"
    :columns="table.columns"
    :fragments="false"
    @row-click="onRowClick"
  />
</template>
