<script>
import table from './clients.table'
import AddClientModal from './client-add'

export default {
  name: 'Clients',
  page: {
    title: 'Clients',
  },
  components: {
    AddClientModal,
  },
  data() {
    return {
      table: table(this),
      modal: {
        add: false,
      },
    }
  },
  methods: {
    onRowClick(row) {
      this.$router.push({
        name: 'client-details',
        params: {
          id: row.id,
        },
      })
    },
  },
}
</script>

<template>
  <main-layout title="Clients">
    <table-layout
      table-name="clients"
      :fragments="false"
      :hider="false"
      quantity
      :processor="table.processor"
      :filters="table.filters"
      :columns="table.columns"
      @row-click="onRowClick"
    >
      <el-table-column
        label="Logo"
        fixed="left"
        width="250"
      >
        <template slot-scope="scope">
          <img
            :src="scope.row.logo ? scope.row.logo : null"
            :alt="scope.row.name"
          >
        </template>
      </el-table-column>
    </table-layout>
    <el-button
      slot="header"
      type="primary"
      @click="modal.add = true"
    >
      Add Client
    </el-button>

    <add-client-modal
      v-if="modal.add"
      slot="header"
      :visible.sync="modal.add"
    />
  </main-layout>
</template>
