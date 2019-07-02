<script>
import ApiProcessor from '@lib/processors/api-processor'
import { mapGetters, mapActions } from 'vuex'
import table from './merchant-offers.table'

export default {
  name: 'MerchantOffers',
  data() {
    return {
      merchant: {},
      table,
      activeTab: 'active',
      selectedItems: [],
    }
  },
  computed: {
    ...mapGetters('merchants', ['tableUpdate']),
    path() {
      const merchantId = this.$route.params.id
      return `/merchants/${merchantId}/offers`
    },
    tableIsEmpty() {
      return !this.table.processor.data.length
    },
  },
  created() {
    this.activeTab = this.$route.params.tab || 'active'
    this.getMerchant()
    this.getMerchantOffers()
  },
  methods: {
    ...mapActions('merchants', ['getGlobalMerchant']),
    async getMerchant() {
      const [, response] = await this.getGlobalMerchant(this.$route.params.id)
      if (response) {
        this.merchant = response
      }
    },
    getMerchantOffers() {
      this.table.processor = new ApiProcessor({
        component: this,
        path: this.path,
        dataFilter: {
          [this.activeTab]: this.activeTab,
        },
      })
    },
    onRowClick(row) {
      this.$router.push({
        name: 'merchant-offer',
        params: { offerId: row.id },
      })
    },
    onTabClick() {
      this.selectedItems = []
      this.$router.push({
        name: 'merchant-offers',
        params: {
          id: this.$route.params.id,
          tab: this.activeTab === 'active' ? null : this.activeTab,
        },
        query: {},
      })
      this.getMerchantOffers()
    },
    onBackClick() {
      this.$router.push({ name: 'merchant-details' })
    },
    handleSelectionChange(value) {
      this.selectedItems = value
    },
  },
}
</script>

<template>
  <main-layout
    :title="merchant.name"
  >
    <el-button
      slot="beforeTitle"
      :class="$style.backButton"
      circle
      icon="el-icon-arrow-left"
      @click="onBackClick"
    />
    <el-tabs
      v-model="activeTab"
      :class="$style.tabs"
      @tab-click="onTabClick"
    >
      <el-tab-pane
        label="Active"
        name="active"
      >
        <table-layout
          table-name="merchant-offers"
          :processor="table.processor"
          :filters="table.filters"
          :columns="table.columns"
          :fragments="false"
          :hider="false"
          quantity
          @row-click="onRowClick"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            v-if="!tableIsEmpty"
            type="selection"
            fixed="left"
            width="55"
          />
        </table-layout>
      </el-tab-pane>
      <el-tab-pane
        label="Inactive"
        name="inactive"
      >
        <table-layout
          table-name="merchant-offers"
          :processor="table.processor"
          :filters="table.filters"
          :columns="table.columns"
          :fragments="false"
          :hider="false"
          quantity
          @row-click="onRowClick"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            v-if="!tableIsEmpty"
            type="selection"
            fixed="left"
            width="55"
          />
        </table-layout>
      </el-tab-pane>
    </el-tabs>
  </main-layout>
</template>

<style lang="scss" module>
.backButton {
  position: absolute;
  left: 0;
  padding: .2rem !important;
  border-color: var(--color-primary);
  border-width: 2px;

  i {
    font-size: 1.2rem;
    font-weight: bold;
    color: var(--color-primary);
  }
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

.tabs {
  :global {
    .el-tabs__header {
      padding: 0 var(--size-card-spacing) calc(var(--size-card-spacing) / 2);
    }
  }
}
</style>
