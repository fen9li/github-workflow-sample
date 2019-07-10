<script>
import { mapActions } from 'vuex'
import ApiProcessor from '@lib/processors/api-processor'
import merchantsTable from './merchants.table.js'
import ClientHeader from './client-header.vue'
import LinkModal from './link-modal.vue'

export default {
  name: 'Client',
  page: {
    title: 'Client',
  },
  components: {
    ClientHeader,
    LinkModal,
  },
  data() {
    return {
      loading: true,
      table: merchantsTable,
      isEdit: false,
      client: {},
      selectedItems: [],
      activeTab: 'linked',
      tabs: [
        { label: 'Linked', name: 'linked' },
        { label: 'Unlinked', name: 'unlinked' },
      ],
    }
  },
  computed: {
    catalogueId() {
      return this.$route.params.id
    },
    linked() {
      return this.activeTab === 'linked' ? 'true' : 'false'
    },
    path() {
      return `/catalogues/${this.catalogueId}/merchants?filters[attached]=${
        this.linked
      }`
    },
  },
  created() {
    this.activeTab = this.$route.params.tab || 'linked'
    this.getMerchantOffers()
    this.getClient()
  },
  methods: {
    ...mapActions('catalogues', ['getMerchant']),
    async getClient() {
      this.client = await this.getMerchant(this.$route.params.id)
      this.loading = false
    },
    getMerchantOffers() {
      this.table.processor = new ApiProcessor({
        component: this,
        path: this.path,
      })
    },
    onRowClick(row) {
      this.$router.push({
        name: 'merchant-details',
        params: { id: row.id },
      })
    },
    onTabClick() {
      this.selectedItems = []
      this.$router.push({
        name: 'client-details',
        params: {
          id: this.$route.params.id,
          tab: this.activeTab === 'linked' ? null : this.activeTab,
        },
        query: {},
      })

      this.getMerchantOffers()
    },
    handleSelectionChange(value) {
      this.selectedItems = value
    },
  },
}
</script>

<template>
  <main-layout
    :title="client.name"
    :loading="loading"
    :back="{ name: 'clients' }"
  >
    <el-card
      :class="$style.card"
      body-style="padding: 0"
    >
      <client-header
        :processor="table.processor"
        :client="client"
        @catalogues-updated="getClient"
      />
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
            :class="$style.table"
            shadow="never"
            :table-name="`clients-details-${tab.name}`"
            :processor="table.processor"
            :filters="table[activeTab].filters"
            :columns="table[activeTab].columns"
            :fragments="false"
            hider
            :quantity="false"
            @row-click="onRowClick"
            @selection-change="handleSelectionChange"
          >
            <el-table-column
              v-if="table.processor.data.length"
              type="selection"
              fixed="left"
              width="55"
            />
            <div v-else />
          </table-layout>

          <link-modal
            :id="client.id"
            :items="selectedItems"
            :name="client.name"
            :merchants-processor="table.processor"
            :link="tab.name !== 'linked'"
          />
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </main-layout>
</template>

<style lang="scss" module>
.header {
  display: flex;
  padding: var(--size-card-spacing);
}

.card {
  width: 100%;
  margin: 0 0 1.25rem;
}

.table {
  padding: 0;
  margin-bottom: rem(16px);
  border: none;
  box-shadow: none !important;
}

.view-details-btn {
  font-weight: 600;
}

.tabs {
  :global {
    .el-tabs__header {
      padding: 0 var(--size-card-spacing) calc(var(--size-card-spacing) / 2);
    }
  }
}

.buttonWrapper {
  display: flex;
  justify-content: flex-end;
  width: 100%;
  padding: rem(0 48px 16px 0);
}
</style>
