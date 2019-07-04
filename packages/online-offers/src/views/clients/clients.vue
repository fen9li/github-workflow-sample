<script>
import clientsTable from './clients.table'
import ClientAddModal from '../client/client-edit-modal.vue'

export default {
  name: 'Clients',
  page: {
    title: 'Clients',
  },
  components: {
    ClientAddModal,
  },
  data() {
    return {
      table: clientsTable(this),
      modal: {
        add: false,
      },
    }
  },
  methods: {
    formatImage(image) {
      if (image) {
        return image + '//-/preview/100x30/-/quality/best/'
      }
    },
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
      hider
      :quantity="false"
      :processor="table.processor"
      :filters="table.filters"
      :columns="table.columns"
      @row-click="onRowClick"
    >
      <el-table-column
        label="Logo"
        fixed="left"
        width="100"
      >
        <template slot-scope="scope">
          <img
            v-if="scope.row.logo"
            :src="formatImage(scope.row.logo)"
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

    <client-add-modal
      v-if="modal.add"
      slot="header"
      :visible.sync="modal.add"
      :processor="table.processor"
      @catalogues-created="modal.add = false"
    />
  </main-layout>
</template>
