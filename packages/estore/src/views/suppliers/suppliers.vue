<script>
import suppliersTable from './suppliers.table'
import getExportedFilename from '@lib/utils/get-exported-filename'

import SupplierEditModal from '../supplier/modals/supplier-edit-modal'

export default {
  name: 'Suppliers',
  page: {
    title: 'Suppliers',
  },
  components: {
    SupplierEditModal,
  },
  data() {
    return {
      table: suppliersTable(this),
      createSupplierModal: false,
    }
  },
  methods: {
    onRowClick(row) {
      this.$router.push({
        name: 'supplier-details',
        params: {
          id: row.id,
        },
      })
    },
    getExportedFilename() {
      return getExportedFilename(this.table.tableName)
    },
    onButtonClick() {
      this.createSupplierModal = true
    }
  },
}
</script>

<template>
  <main-layout title="Suppliers">
    <template #header>
      <el-button
        type="primary"
        :disabled="createSupplierModal"
        @click="onButtonClick"
      >
        Create Supplier
      </el-button>
    </template>
    <table-layout
      :table-name="table.tableName"
      :fragments="false"
      hider
      :processor="table.processor"
      :filters="table.filters"
      :columns="table.columns"
      :export-filename="getExportedFilename"
      @row-click="onRowClick"
    />
    <supplier-edit-modal
      v-if="createSupplierModal"
      :visible.sync="createSupplierModal"
      modal-append-to-body
      append-to-body
    />
  </main-layout>
</template>
