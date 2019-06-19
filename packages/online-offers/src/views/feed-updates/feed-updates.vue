<script>
import table from './feed-updates.table.js'
import merchantUpdateModal from '../merchant-update'
import ApiProcessor from '@lib/processors/api-processor'

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
      table,
      activeItemId: null,
      modal: {
        merchantUpdate: false,
      },
    }
  },
  computed: {
    slug() {
      return this.$route.params.slug
    },
  },
  watch: {
    '$route'() {
      this.getFeeds()
    },
  },
  created() {
    this.getFeeds()
  },
  methods: {
    getFeeds() {
      this.table.processor = new ApiProcessor({
        component: this,
        path: `feedmerchants?filter[feeds]=${this.slug}`,
      })
    },
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
  <main-layout
    v-if="table.processor"
    title="Feed Updates"
  >
    <table-layout
      table-name="feed-updates"
      :processor="table.processor"
      :filters="table.filters"
      :columns="table.columns"
      :fragments="false"
      :hider="false"
      @row-click="onRowClick"
    />
    <merchant-update-modal
      v-if="modal.merchantUpdate"
      :id="activeItemId"
      :visible.sync="modal.merchantUpdate"
    />
  </main-layout>
</template>
