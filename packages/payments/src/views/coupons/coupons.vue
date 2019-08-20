<script>
import CouponFormModal from '../coupon/coupon-form-modal'
import table from './coupons-table'
import { mapActions } from 'vuex'

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
        create: false,
      },
    }
  },
  mounted() {
    const removedItem = this.$route.params.removed
    if(removedItem) {
      this.UPDATE_TABLE({ ...this.table, removedItem })
    }
  },
  methods: {
    ...mapActions('ui', ['UPDATE_TABLE']),
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
      @row-click="onRowClick"
    />

    <el-button
      slot="header"
      type="primary"
      data-test="add-coupon"
      @click="modal.create = true"
    >
      Create coupon
    </el-button>
    <coupon-form-modal
      v-if="modal.create"
      :visible.sync="modal.create"
      @updated="UPDATE_TABLE(table)"
    />
  </main-layout>
</template>

<style lang="scss" module>

.deleteButton {
  margin-left: 1.2rem !important;
}
</style>
