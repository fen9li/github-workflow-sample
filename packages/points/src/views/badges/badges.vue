<script>
import table from './badges.table.js'
import BadgeCreateModal from './modals/badge-create-modal.vue'

export default {
  name: 'Badges',
  components: {
    BadgeCreateModal,
  },
  data() {
    return {
      table: table(this),
      modal: {
        create: false,
      },
    }
  },
  methods: {
    onRowClick(row) {
      this.$router.push({
        name: 'badge-details',
        params: {
          id: row.id,
        },
      })
    },
    onCreateSuccess() {
      this.table.processor.getData()
      this.modal.create = false
    },
  },
}
</script>

<template>
  <main-layout title="Badges">
    <template slot="header">
      <el-button
        type="primary"
        class="el-button--wide"
        @click="modal.create = true"
      >
        Add Account Badge
      </el-button>
      <badge-create-modal
        v-if="modal.create"
        :visible.sync="modal.create"
        @success="onCreateSuccess"
      />
    </template>
    <table-layout
      table-name="badges"
      :processor="table.processor"
      :filters="table.filters"
      :columns="table.columns"
      :fragments="false"
      @row-click="onRowClick"
    />
  </main-layout>
</template>
