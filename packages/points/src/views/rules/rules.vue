<script>
import table from './rules.table.js'
import RuleCreateModal from './modals/rule-create-modal.vue'

export default {
  name: 'Rules',
  components: {
    RuleCreateModal,
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
        name: 'rule-details',
        params: {
          id: row.id,
        },
      })
    },
    async onCreate(){
      await this.table.processor.getData()
      this.modal.create = false
    },
  },
}
</script>

<template>
  <main-layout title="Rules">
    <template slot="header">
      <el-button
        type="primary"
        class="el-button--wide"
        @click="modal.create = true"
      >
        Add Rule
      </el-button>
      <rule-create-modal
        v-if="modal.create"
        :visible.sync="modal.create"
        @done="onCreate"
      />
    </template>
    <table-layout
      table-name="rules"
      :processor="table.processor"
      :filters="table.filters"
      :columns="table.columns"
      :fragments="false"
      @row-click="onRowClick"
    />
  </main-layout>
</template>
