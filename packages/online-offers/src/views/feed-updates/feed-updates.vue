<script>
import feedUpdatesTable from './feed-updates.table.js'
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
      table: feedUpdatesTable(this),
      modal: { merchantUpdate: false },
    }
  },
  methods: {
    onRowClick(row, column, event) {
      if (this.activeTab === 'merchants') {
        this.$router.push({
          name: 'feed-merchant',
          params: {
            id: row.external_id,
          },
        })
      } else if (this.activeTab === 'offers') {
        this.$router.push({
          name: 'feed-offer',
          params: {
            id: row.id,
          },
        })
      }
    },
  },
}
</script>

<template>
  <main-layout
    v-if="table.processor"
    :title="`Feed Updates`"
  >
    <table-layout
      table-name="feed-updates"
      :processor="table.processor"
      :filters="table.filters"
      :columns="table.columns"
      :fragments="false"
      hider
      :quantity="false"
      @row-click="onRowClick"
    />
    <merchant-update-modal
      v-if="modal.merchantUpdate"
      :id="activeItemId"
      :visible.sync="modal.merchantUpdate"
      :processor="table.processor"
    />
  </main-layout>
</template>
