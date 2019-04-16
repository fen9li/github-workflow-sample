
<script>
import MainLayout from '@layouts/main/main-layout'
import TableLayout from '@layouts/table/table-layout'
import StatisProcessor from '@core/static-processor'
import CouponsCreateModal from './coupons-create'
import CouponsEditModal from './coupons-edit'
import CouponsDeleteModal from './coupons-delete'
import tableConfig from './coupons-table'

const coupons = require('@mock-api/resources/coupons')

export default {
  name: 'Coupons',
  page: {
    title: 'Coupons',
  },
  components: {
    TableLayout,
    MainLayout,
    CouponsCreateModal,
    CouponsEditModal,
    CouponsDeleteModal,
  },
  data() {
    return {
      modal: {
        edit: false,
        delete: false,
        create: false,
      },
      processor: new StatisProcessor({
        component: this,
        data: coupons.data,
      }),
      filters: tableConfig.filters,
      columns: tableConfig.columns,
    }
  },
}
</script>

<template>
  <main-layout title="Coupons">
    <table-layout
      :processor="processor"
      :filters="filters"
      :columns="columns"
    >
      <el-table-column
        slot="column"
        class-name="fixed-column"
        fixed="right"
        width="90"
      >
        <el-button
          class="flat-icon-button"
          type="primary"
          icon="el-icon-edit"
          plain
          @click="modal.edit = true"
        />
        <el-button
          :class="[
            'flat-icon-button',
            $style.deleteButton,
          ]"
          type="danger"
          icon="el-icon-delete"
          plain
          @click="modal.delete = true"
        />
      </el-table-column>
    </table-layout>

    <el-button
      slot="header"
      type="primary"
      @click="modal.create = true"
    >
      Create coupon
    </el-button>
    <coupons-create-modal
      v-if="modal.create"
      :visible.sync="modal.create"
    />
    <coupons-delete-modal
      v-if="modal.delete"
      :visible.sync="modal.delete"
    />
    <coupons-edit-modal
      v-if="modal.edit"
      :visible.sync="modal.edit"
    />
  </main-layout>
</template>

<style lang="scss" module>

.deleteButton {
  margin-left: 1.2rem !important;
}
</style>
