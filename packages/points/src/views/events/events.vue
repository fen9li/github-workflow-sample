<script>
import eventsTable from './events.table'
import CreateModal from '../event/modals/event-modal'
import getExportedFilename from '@lib/utils/get-exported-filename'

export default {
  name: "EventsPoints",
  components: {
    CreateModal,
  },
  data() {
    return {
      table: eventsTable(this),
      modals: {
        create: false,
      },
    }
  },
  methods: {
    onRowClick(row) {
      this.$router.push({
        name: 'event',
        params: {
          id: row.id,
        },
      })
    },
    onCreateEventClick() {},
    getExportedFilename() {
      return getExportedFilename(this.table.tableName)
    }
  },
}
</script>

<template>
  <main-layout title="Events">
    <template slot="header">
      <el-button
        type="primary"
        @click="modals.create = true"
      >
        Create Event
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
    />
  </main-layout>
</template>
