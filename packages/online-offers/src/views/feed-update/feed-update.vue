<script>
import { mapGetters } from 'vuex'
import feedUpdateTable from './feed-update.table.js'
import merchantUpdateModal from '../merchant-update'
import ApiProcessor from '@lib/processors/api-processor'
import get from 'lodash/get'

export default {
  name: 'FeedUpdate',
  page: {
    title: 'Feed Update',
  },
  components: {
    merchantUpdateModal,
  },
  data() {
    return {
      table: feedUpdateTable,
      activeItemId: null,
      activeTab: this.$route.params.tab || 'merchants',
      defaultActiveTab: 'merchants',
      modal: {
        merchantUpdate: false,
      },
      tabs: [
        { label: 'Merchants', name: 'merchants' },
        { label: 'Offers', name: 'offers' },
      ],
    }
  },
  computed: {
    ...mapGetters('feeds', [
      'feeds',
    ]),
    slug() {
      return this.$route.params.slug
    },
    name() {
      const feed = this.feeds.find(el => el.slug === this.slug)
      return get(feed, 'name')
    },
    path() {
      const filter = this.slug ? `?filters[feeds]=${this.slug}` : ''
      return `feed${this.activeTab}${filter}`
    },
  },
  watch: {
    '$route'(route, prevRoute) {
      this.getFeeds()
      if (route.params.slug !== prevRoute.params.slug) {
        this.activeTab = this.defaultActiveTab
      }
    },
  },
  created() {
    this.getFeeds()
  },
  methods: {
    getFeeds() {
      this.table.processor = new ApiProcessor({
        component: this,
        path: this.path,
        dataTransform: [
          {
            path: 'payload',
            key: 'name',
            values: [
              'advertisername',
              'name',
              'merchantname',
            ],
          },
          {
            path: 'payload',
            key: 'description',
            values: [
              'description',
              'offerdescription',
            ],
          },
        ],
      })
    },
    onTabClick() {
      this.$router.push({
        name: 'feed-update',
        params: {
          slug: this.$route.params.slug,
          tab: this.activeTab,
        },
        query: {},
      })
      this.getFeeds()
    },
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
    :title="`${name} Feed Updates`"
  >
    <el-tabs
      v-model="activeTab"
      :class="$style.tabs"
      @tab-click="onTabClick"
    >
      <el-tab-pane
        v-for="tab in tabs"
        :key="tab.name"
        :label="tab.label"
        :name="tab.name"
      >
        <table-layout
          :table-name="`feed-update-${tab.name}-${name}`"
          :processor="table.processor"
          :filters="table[activeTab].filters"
          :columns="table[activeTab].columns"
          :fragments="false"
          hider
          :quantity="[25, 50, 100, 200]"
          @row-click="onRowClick"
        />
      </el-tab-pane>
    </el-tabs>
    <merchant-update-modal
      v-if="modal.merchantUpdate"
      :id="activeItemId"
      :visible.sync="modal.merchantUpdate"
      :processor="table.processor"
    />
  </main-layout>
</template>

<style lang="scss" module>
.tabs {
  :global {
    .el-tabs__header {
      padding: 0 var(--size-card-spacing) calc(var(--size-card-spacing) / 2);
    }
  }
}
</style>
