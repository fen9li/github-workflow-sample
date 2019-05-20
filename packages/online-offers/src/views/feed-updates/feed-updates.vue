<script>
import table from './feed-updates.table.js'
import merchantUpdateModal from '../merchant-update'

export default {
  name: 'FeedUpdates',
  page: {
    title: 'Feed Updates',
  },
  components: {
    merchantUpdateModal,
  },
  data() {
    return {
      table: table(this),
      activeItemId: null,
      modal: {
        merchantUpdate: false,
      },
    }
  },
  methods: {
    onRowClick(row) {
      if (row.update === 'Merchant update') {
        this.activeItemId = row.id || 'fakeId'
        this.modal.merchantUpdate = true
      }
    },
  },
}
</script>

<template>
  <main-layout title="Feed Updates">
    <table-layout
      table-name="feed-updates"
      :processor="table.processor"
      :filters="table.filters"
      :columns="table.columns"
      :fragments="false"
      :hider="false"
      quantity
      @row-click="onRowClick"
    />
    <merchant-update-modal
      v-if="modal.merchantUpdate"
      :id="activeItemId"
      :visible.sync="modal.merchantUpdate"
    />
  </main-layout>
</template>
