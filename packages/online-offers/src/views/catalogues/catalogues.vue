<script>
import cataloguesTable from './catalogues.table'
import EditCatalogueModal from '../catalogue/catalogue-edit-modal.vue'
import getExportedFilename from '../../utils/get-exported-filename'

export default {
  name: 'Catalogues',
  page: {
    title: 'Clients',
  },
  components: {
    EditCatalogueModal,
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
    onRowClick(row) {
      this.$router.push({
        name: 'catalogue-details',
        params: {
          id: row.id,
        },
      })
    },
    getExportedFilename() {
      return getExportedFilename('ClientListing')
    },
    greyOutRowText(row) {
      return !row.enabled
    }
  },
}
</script>

<template>
  <main-layout title="Clients">
    <table-layout
      :table-name="table.tableName"
      :fragments="false"
      hider
      :quantity="[25, 50, 100, 200]"
      :processor="table.processor"
      :filters="table.filters"
      :columns="table.columns"
      :export-filename="getExportedFilename"
      :grey-out-row-text="greyOutRowText"
      @row-click="onRowClick"
    />
    <el-button
      slot="header"
      type="primary"
      data-test="add"
      class="el-button--wide"
      @click="modal.add = true"
    >
      Add Client
    </el-button>

    <edit-catalogue-modal
      v-if="modal.add"
      slot="header"
      :visible.sync="modal.add"
      :processor="table.processor"
      @catalogues-created="modal.add = false"
    />
  </main-layout>
</template>
