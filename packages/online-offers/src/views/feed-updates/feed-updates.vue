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
    onRowClick(row) {
      const { type } = row

      if (type === 'merchant') {
        this.$router.push({
          name: 'feed-merchant',
          params: {
            slug: row.feed_merchant.feed,
            id: row.feed_merchant.external_id,
          },
        })
      } else if (type === 'offer') {
        this.$router.push({
          name: 'feed-offer',
          params: {
            slug: row.feed_offer.feed,
            id: row.feed_offer.id,
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
      :quantity="[25, 50, 100, 200]"
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
