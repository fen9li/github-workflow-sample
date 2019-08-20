<script>
import ApiProcessor from '@lib/processors/api-processor'
import { mapActions } from 'vuex'
import merchantOffersTable from './merchant-offers.table'
import MerchantModal from './merchant-modal'
import getExportedFilename from '../../../utils/get-exported-filename'

export default {
  name: 'MerchantOffers',
  components: {
    MerchantModal,
  },
  data() {
    return {
      merchant: {},
      table: merchantOffersTable,
      activeTab: 'active',
      selectedItems: [],
      tabs: [
        { label: 'Active', name: 'active' },
        { label: 'Inactive', name: 'inactive' },
      ],
    }
  },
  computed: {
    merchantId() {
      return this.$route.params.id
    },
    isEdit() {
      return this.$route.params.edit
    },
    status() {
      return this.activeTab === 'active' ? 'true' : 'false'
    },
    path() {
      return `/merchants/${this.merchantId}/offers?filters[enabled]=${
        this.status
      }`
    },
    activeTableName () {
      const { activeTab } = this

      return `merchant-offers-${activeTab}`
    }
  },
  created() {
    this.activeTab = this.$route.params.tab || 'active'
    this.fetchMerchant()
    this.getMerchantOffers()
  },
  methods: {
    ...mapActions('merchants', ['getGlobalMerchant']),
    async fetchMerchant() {
      const [, response] = await this.getGlobalMerchant(this.$route.params.id)

      if (response) {
        this.merchant = response
      }
    },
    getMerchantOffers() {
      this.table.processor = new ApiProcessor({
        component: this,
        path: this.path,
      })
    },
    onRowClick(row) {
      this.$router.push({
        name: 'offer-details',
        params: { id: row.id, },
      })
    },
    onTabClick() {
      this.selectedItems = []
      this.$router.push({
        name: 'merchant-details',
        params: {
          id: this.$route.params.id,
          tab: this.activeTab === 'active' ? null : this.activeTab,
        },
        query: {},
      })

      this.getMerchantOffers()
    },
    handleSelectionChange(value) {
      this.selectedItems = value
    },
    getExportedFilename() {
      return getExportedFilename(this.activeTableName)
    }
  },
}
</script>

<template>
  <el-card
    v-if="!isEdit"
    :class="$style.card"
  >
    <div :class="$style.wrapTitle">
      Offers
    </div>
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
          :table-name="`merchant-offers-${tab.name}`"
          shadow="never"
          :processor="table.processor"
          :filters="table.filters"
          :columns="table.columns"
          :fragments="false"
          :hider="false"
          :quantity="[25, 50, 100, 200]"
          :export-filename="getExportedFilename"
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

        <merchant-modal
          v-if="table.processor.data.length"
          :id="merchant.id"
          :items="selectedItems"
          :name="merchant.name"
          :activate="tab.name === 'inactive'"
          :offers-processor="table.processor"
        />
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<style lang="scss" module>
.card {
  margin-top: rem(24px);

> div {
    padding: 0 !important;
    padding-top: rem(36px) !important;
  }
}

.wrapTitle {
  padding: rem(0 48px 12px);
  font-size: 1.4rem;
  font-weight: 600;
}

.backButton {
  position: absolute;
  left: 0;
  padding: 0.2rem !important;
  border-color: var(--color-primary);
  border-width: 2px;

  i {
    font-size: 1.2rem;
    font-weight: bold;
    color: var(--color-primary);
  }
}

.table {
  padding: 0;
  margin-bottom: rem(16px);
  border: none;
  box-shadow: none !important;
}

.tabs {
  :global {
    .el-tabs__header {
      padding: 0 var(--size-card-spacing) calc(var(--size-card-spacing) / 2);
      margin: 0;
    }
  }
}
</style>
