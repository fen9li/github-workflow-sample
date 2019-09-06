<script>
import table from './limits.table.js'
import CreateLimitModal from './modals/create-limit-modal.vue'

export default {
  name: 'Limits',
  components: {
    CreateLimitModal
  },
  data() {
    return {
      table: table(this),
      modal: {
        create: false
      }
    }
  },
  methods: {
    onRowClick(row) {
      this.$router.push({
        name: 'limit-details',
        params: {
          limitId: row.id,
        },
      })
    },
  },
}
</script>

<template>
  <main-layout title="Limits">
    <el-button
      slot="header"
      type="primary"
      @click="modal.create = true"
    >
      Create Limit
    </el-button>

    <table-layout
      table-name="limits"
      :processor="table.processor"
      :filters="table.filters"
      :columns="table.columns"
      :fragments="false"
      @row-click="onRowClick"
    />

    <create-limit-modal
      v-if="modal.create"
      :visible.sync="modal.create"
      @close-modal="modal.create = false"
      @done="table.processor.getData()"
    />
  </main-layout>
</template>
