<script>
import { mapActions } from 'vuex'
import { formatDate } from '@lib/utils/format-date'
import DeleteContractModal from './modals/delete-contract.modal.vue'
import ToggleContractStatusModal from './modals/toggle-contract-status.modal.vue'

import ContractMock from './contract.mock.js'

export default {
  name: 'ProductDetail',
  components: {
    DeleteContractModal,
    ToggleContractStatusModal,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
      contract: ContractMock,
      modals: {
        updateStatus: false,
        delete: false,
      },
      backRoute: { name: 'contracts' },
      activeTab: 'info',
    }
  },
  computed: {
    title() {
      if (this.loading) {
        return ''
      }

      return `Contract ${this.contract.id}`
    },
  },
  async created() {
    // this.fetchContract()
  },
  methods: {
    ...mapActions('contract', ['getContract']),
    formatDate(value) {
      return formatDate(value, 'DD/MM/YYYY hh:mm')
    },
    async fetchContract() {
      this.loading = true

      const [err, response] = await this.getContract(this.id)

      if (err) {
        this.$router.replace(this.backRoute)
      } else {
        this.contract = response
      }

      this.loading = false
    },
    onStatusUpdated() {
      // this.fetchContract()
      this.modals.updateStatus = false
    },
  },
}
</script>

<template>
  <main-layout
    :title="title"
    :back="backRoute"
    :loading="loading"
  >
    <el-dropdown
      slot="header"
      trigger="click"
    >
      <div :class="$style.drop">
        <i class="el-icon-more" />
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click.native="modals.updateStatus = true">
          Update Status
        </el-dropdown-item>
        <el-dropdown-item @click.native="activeTab = 'settings'">
          Edit Contract Settings
        </el-dropdown-item>
        <el-dropdown-item @click.native="modals.delete = true">
          Delete Contract
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

    <el-tabs v-model="activeTab">
      <el-tab-pane
        label="Information"
        name="info"
        lazy
      >
        <data-box
          header="Contract Details"
          :status="contract.active ? 'active' : 'inactive'"
        >
          <data-list>
            <dt>Date Created</dt>
            <dd>{{ formatDate(contract.created_at) || '-' }}</dd>

            <dt>Contract ID</dt>
            <dd>{{ contract.id || '-' }}</dd>

            <dt>Provider</dt>
            <dd>{{ contract.providerName || '-' }}</dd>

            <dt>Supplier</dt>
            <dd>{{ contract.supplierName || '-' }}</dd>

            <dt>Last Updated</dt>
            <dd>{{ formatDate(contract.updated_at) || '-' }}</dd>
          </data-list>
        </data-box>
      </el-tab-pane>

      <el-tab-pane
        label="Settings"
        name="settings"
        lazy
      >
        <data-box header="Not in MVP" />
      </el-tab-pane>
    </el-tabs>

    <delete-contract-modal
      v-if="modals.delete"
      :visible.sync="modals.delete"
      :contract="contract"
      @close-modal="modals.delete = false"
      @success="$router.replace(backRoute)"
    />
    <toggle-contract-status-modal
      v-if="modals.updateStatus"
      :visible.sync="modals.updateStatus"
      :contract="contract"
      @close-modal="modals.delete = false"
      @success="onStatusUpdated"
    />
  </main-layout>
</template>

<style lang="scss" module>
.drop {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.4rem;
  font-size: 1.4rem;
  color: var(--color-primary-lightest);
  cursor: pointer;
  background-color: transparent;
  border-radius: 3px;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: var(--color-primary-transparent);
  }

  i {
    transform: rotate(90deg);
  }
}
</style>
