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
    slug() {
      return this.$route.params.slug
    },
    path() {
      const filter = this.slug ? `?filters[feeds]=${this.slug}` : ''
      return `feed${this.activeTab}${filter}`
    },
    localStorageKey() {
      return `feedUpdates-${this.slug}`
    },
  },
  watch: {
    '$route'() {
      this.getFeeds()
    },
    tableUpdate() {
      this.getFeeds()
    },
    activeTab(value) {
      localStorage[this.localStorageKey] = value
    },
  },
  mounted() {
    if (localStorage[this.localStorageKey]) {
      this.activeTab = localStorage[this.localStorageKey]
    }
  },
  created() {
    this.getFeeds()
    this.getCategories()
  },
  methods: {
    capitalize,
    ...mapMutations('merchants', {
      updateTable: 'UPDATE_TABLE',
    }),
    ...mapActions('categories', ['getCategories']),
    getActiveTab() {

    },
    getFeeds() {
      this.updateTable(false)
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
