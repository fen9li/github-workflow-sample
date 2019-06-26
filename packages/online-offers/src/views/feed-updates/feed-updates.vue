<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import table from './feed-updates.table.js'
import merchantUpdateModal from '../merchant-update'
import ApiProcessor from '@lib/processors/api-processor'
import capitalize from 'lodash/capitalize'

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
      activeTab: 'merchants',
      modal: {
        merchantUpdate: false,
      },
    }
  },
  computed: {
    ...mapGetters('merchants', ['tableUpdate']),
    ...mapGetters('offers', ['tableOffersUpdate']),
    slug() {
      return this.$route.params.slug
    },
    path() {
      const filter = this.slug ? `?filters[feeds]=${this.slug}` : ''
      return `feed${this.activeTab}${filter}`
    },
  },
  watch: {
    '$route'() {
      this.getFeeds()
    },
    tableUpdate() {
      this.getFeeds()
    },
    tableOffersUpdate() {
      this.getFeeds()
    },
  },
  mounted() {
    this.activeTab = this.$route.params.tab || 'merchants'
  },
  created() {
    this.getFeeds()
    this.getCategories()
  },
  methods: {
    capitalize,
    ...mapMutations('merchants', {
      updateMerchantsTable: 'UPDATE_TABLE',
    }),
    ...mapMutations('offers', {
      updateOffersTable: 'UPDATE_TABLE',
    }),
    ...mapActions('categories', ['getCategories']),
    getFeeds() {
      this.updateMerchantsTable(false)
      this.updateOffersTable(false)
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
          tab: this.activeTab === 'merchants' ? null : this.activeTab,
        },
        query: {},
      })
      this.getFeeds()
    },
    onCellClick(row, column, event) {
      this.$router.push({
        name: 'feed-details',
        params: {
          id: row.external_id,
        },
      })
    },
  },
}
</script>

<template>
  <main-layout
    v-if="table.processor"
    :title="`${capitalize(slug)} Feed Updates`"
  >
    <el-tabs
      v-model="activeTab"
      :class="$style.tabs"
      @tab-click="onTabClick"
    >
      <el-tab-pane
        label="Merchants"
        name="merchants"
      >
        <table-layout
          table-name="feed-updates"
          :processor="table.processor"
          :filters="table[activeTab].filters"
          :columns="table[activeTab].columns"
          :fragments="false"
          :hider="false"
          quantity
          @row-click="onCellClick"
        />
      </el-tab-pane>
      <el-tab-pane
        label="Offers"
        name="offers"
      >
        <table-layout
          table-name="feed-updates"
          :processor="table.processor"
          :filters="table[activeTab].filters"
          :columns="table[activeTab].columns"
          :fragments="false"
          :hider="false"
          quantity
          @row-click="onCellClick"
        />
      </el-tab-pane>
    </el-tabs>
    <merchant-update-modal
      v-if="modal.merchantUpdate"
      :id="activeItemId"
      :visible.sync="modal.merchantUpdate"
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
