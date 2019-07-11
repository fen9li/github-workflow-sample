<script>
import { mapGetters, mapMutations } from 'vuex'
import feedUpdatesTable from './feed-updates.table.js'
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
      table: feedUpdatesTable,
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
      const { name } = this.feeds.find(el => el.slug === this.slug)
      return name
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
    ...mapMutations('merchants', {
    }),
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
        name: 'feed-updates',
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
          :table-name="`feed-updates-${tab.name}`"
          :processor="table.processor"
          :filters="table[activeTab].filters"
          :columns="table[activeTab].columns"
          :fragments="false"
          hider
          :quantity="false"
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
