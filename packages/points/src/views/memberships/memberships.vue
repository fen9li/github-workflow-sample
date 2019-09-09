<script>
import membershipsTable from './memberships.table'
import createModal from '../membership/modals/membership-modal'
import getExportedFilename from '@lib/utils/get-exported-filename'
import { mapActions, mapState } from 'vuex'

export default {
  name: "MembershipsPoints",
  components: {
    createModal,
  },
  data() {
    return {
      table: membershipsTable(this),
      modals: {
        create: false,
      },
    }
  },
  computed: {
    ...mapState('providers', ['providers']),
  },
  methods: {
    ...mapActions('providers', ['getProviders']),
    onRowClick(row) {
      this.$router.push({
        name: 'membership',
        params: {
          id: row.id,
        },
      })
    },
    onCreateEventClick() {},
    getExportedFilename() {
      return getExportedFilename(this.table.tableName)
    },
    async onModalCreated() {
      await this.table.processor.getData()
      this.modals.create = false
    },
  },
}
</script>

<template>
  <main-layout title="Memberships">
    <template slot="header">
      <el-button
        type="primary"
        @click="modals.create = true"
      >
        Create Membership
      </el-button>
    </template>
    <table-layout
      :table-name="table.tableName"
      :processor="table.processor"
      :filters="table.filters"
      :columns="table.columns"
      :fragments="false"
      :export-filename="getExportedFilename"
      hider
      @row-click="onRowClick"
    />

    <create-modal
      v-if="modals.create"
      :visible.sync="modals.create"
      @close-modal="modals.create = false"
      @done="onModalCreated"
    />
  </main-layout>
</template>
