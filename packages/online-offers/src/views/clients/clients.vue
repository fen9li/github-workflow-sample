<script>
import ApiProcessor from '@lib/processors/api-processor'
import table from './clients.table'
// import AddClientModal from './client-add'
import AddClientModal from '../client/client-edit-modal.vue'
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'Clients',
  page: {
    title: 'Clients',
  },
  components: {
    AddClientModal,
  },
  data() {
    return {
      table: table(this),
      modal: {
        add: false,
      },
    }
  },
  computed: {
    ...mapGetters('catalogues', ['tableUpdate']),
  },
  watch: {
    tableUpdate() {
      this.getClients()
    },
  },
  created() {
    this.getClients()
  },
  methods: {
    ...mapMutations('catalogues', {
      updateTable: 'UPDATE_TABLE',
    }),
    getClients() {
      this.updateTable(false)
      this.table.processor = new ApiProcessor({
        component: this,
        path: 'catalogues',
      })
    },
    formatImage(image) {
      if (image) {
        return image + '//-/preview/100x30/-/quality/best/'
      }
    },
    onRowClick(row) {
      this.$router.push({
        name: 'client-details',
        params: {
          id: row.id,
        },
      })
    },
  },
}
</script>

<template>
  <main-layout title="Clients">
    <table-layout
      table-name="clients"
      :fragments="false"
      :hider="false"
      quantity
      :processor="table.processor"
      :filters="table.filters"
      :columns="table.columns"
      @row-click="onRowClick"
    >
      <el-table-column
        label="Logo"
        fixed="left"
        width="100"
      >
        <template slot-scope="scope">
          <img
            v-if="scope.row.logo"
            :src="formatImage(scope.row.logo)"
            :alt="scope.row.name"
          >
        </template>
      </el-table-column>
    </table-layout>
    <el-button
      slot="header"
      type="primary"
      @click="modal.add = true"
    >
      Add Client
    </el-button>

    <add-client-modal
      v-if="modal.add"
      slot="header"
      :visible.sync="modal.add"
      @catalogues-created="modal.add = false"
    />
  </main-layout>
</template>
