<script>
import cataloguesTable from './catalogues.table'
import CatalogueAddModal from '../catalogue/catalogue-edit-modal.vue'

export default {
  name: 'Catalogues',
  page: {
    title: 'Clients',
  },
  components: {
    CatalogueAddModal,
  },
  data() {
    return {
      table: cataloguesTable(this),
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
        name: 'catalogue-details',
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
      table-name="catalogue"
      :fragments="false"
      hider
      :quantity="[25, 50, 100, 200]"
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
      class="el-button--wide"
      @click="modal.add = true"
    >
      Add Client
    </el-button>

    <catalogue-add-modal
      v-if="modal.add"
      slot="header"
      :visible.sync="modal.add"
      :processor="table.processor"
      @catalogues-created="modal.add = false"
    />
  </main-layout>
</template>
