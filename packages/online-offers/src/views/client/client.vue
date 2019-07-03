<script>
import table from './merchants.table'
import ApiProcessor from '@lib/processors/api-processor'
import { mapActions } from 'vuex'
import ClientHeader from './client-header'
import LinkModal from './link-modal'

export default {
  name: 'Clients',
  page: {
    title: 'Clients',
  },
  components: {
    ClientHeader,
    LinkModal,
  },
  data() {
    return {
      table: table(this),
      isEdit: false,
      client: {},
      activeTab: 'linked',
      selectedItems: [],
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
      return `/catalogues/${this.catalogueId}/merchants?filters[attached]=${this.linked}`
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
    },
    getMerchantOffers() {
      this.table.processor = new ApiProcessor({
        component: this,
        path: this.path,
      })
    },
    onBackClick() {
      this.$router.push({ name: 'clients' })
    },
    onRowClick(row) {
      this.$router.push({
        name: 'merchant-details',
        params: { slug: row.merchantName || 'unknown' },
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
    unlink() {},
    link() {},
  },
}
</script>

<template>
  <main-layout
    :title="client.name"
  >
    <el-button
      slot="beforeTitle"
      :class="$style.backButton"
      circle
      icon="el-icon-arrow-left"
      @click="onBackClick"
    />
    <el-card
      :class="$style.card"
      body-style="padding: 0"
    >
      <client-header
        :client="client"
        @catalogues-updated="getClient()"
      />

      <el-tabs
        v-model="activeTab"
        :class="$style.tabs"
        @tab-click="onTabClick"
      >
        <el-tab-pane
          label="Linked"
          name="linked"
        >
          <table-layout
            :class="$style.table"
            shadow="never"
            table-name="clients-details"
            :processor="table.processor"
            :filters="table[activeTab].filters"
            :columns="table[activeTab].columns"
            :fragments="false"
            :hider="false"
            quantity
            @row-click="onRowClick"
            @selection-change="handleSelectionChange"
          >
            <el-table-column
              type="selection"
              fixed="left"
            />
          </table-layout>

          <!-- <unlink-dialog :items="selectedItems"/> -->
          <link-modal
            :id="client.id"
            :items="selectedItems"
            :name="client.name"
            :link="false"
          />
        </el-tab-pane>
        <el-tab-pane
          label="Unlinked"
          name="unlinked"
        >
          <table-layout
            :class="$style.table"
            shadow="never"
            table-name="clients-details"
            :processor="table.processor"
            :filters="table[activeTab].filters"
            :columns="table[activeTab].columns"
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
          <link-modal
            :id="client.id"
            :items="selectedItems"
            :name="client.name"
            :link="true"
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
