<script>
import CouponFormModal from '../coupon/coupon-form-modal'
import table from './coupons-table'

export default {
  name: 'Coupons',
  components: {
    CouponFormModal,
  },
  page: {
    title: 'Coupons',
  },
  data() {
    return {
      table: table(this),
      modal: {
        edit: false,
        delete: false,
        create: false,
      },
    }
  },
  methods: {
    onRowClick(row) {
      this.$router.push({
        name: 'coupon-details',
        params: { id: row.id },
      })
    },
  },
}
</script>

<template>
  <main-layout title="Coupons">
    <table-layout
      table-name="coupons"
      :processor="table.processor"
      :filters="table.filters"
      :columns="table.columns"
      :fragments="false"
      @row-click="onRowClick"
    />

    <el-button
      slot="header"
      type="primary"
      @click="modal.create = true"
    >
      Create coupon
    </el-button>
    <coupon-form-modal
      v-if="modal.create"
      :visible.sync="modal.create"
    />
  </main-layout>
</template>

<style lang="scss" module>

.deleteButton {
  margin-left: 1.2rem !important;
}
</style>
