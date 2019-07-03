<script>
import ApiProcessor from '@lib/processors/api-processor'
import { mapGetters, mapActions, mapMutations } from 'vuex'
import table from './merchant-offers.table'
import MerchantModal from './merchant-modal'

export default {
  name: 'MerchantOffers',
  components: {
    MerchantModal,
  },
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
    merchantId() {
      return this.$route.params.id
    },
    status() {
      return this.activeTab === 'active' ? 'true' : 'false'
    },
    path() {
      return `/merchants/${this.merchantId}/offers?filters[enabled]=${this.status}`
    },
    tableIsEmpty() {
      return !this.table.processor.data.length
    },
  },
  watch: {
    tableUpdate() {
      this.getMerchantOffers()
    },
  },
  created() {
    this.activeTab = this.$route.params.tab || 'active'
    this.getMerchant()
    this.getMerchantOffers()
  },
  methods: {
    ...mapActions('merchants', ['getGlobalMerchant']),
    ...mapMutations('merchants', {
      updateTable: 'UPDATE_TABLE',
    }),
    async getMerchant() {
      const [, response] = await this.getGlobalMerchant(this.$route.params.id)
      if (response) {
        this.merchant = response
      }
    },
    getMerchantOffers() {
      this.updateTable(false)
      this.table.processor = new ApiProcessor({
        component: this,
        path: this.path,
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
    :back="{
      name: 'merchant-details'
    }"
  >
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
            type="selection"
            fixed="left"
            width="55"
          />
        </table-layout>
        <merchant-modal
          :id="merchant.id"
          :items="selectedItems"
          :name="merchant.name"
          :activate="false"
        />
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
            type="selection"
            fixed="left"
            width="55"
          />
        </table-layout>
        <merchant-modal
          :id="merchant.id"
          :items="selectedItems"
          :name="merchant.name"
          :activate="true"
        />
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
