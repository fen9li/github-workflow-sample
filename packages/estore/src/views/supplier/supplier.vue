<script>
// import { mapActions, mapState } from 'vuex'
import capitalize from 'lodash/capitalize'

import SupplierInformation from './tabs/supplier-information'
import SupplierContracts from './tabs/supplier-contracts'
import SupplierCatalogue from './tabs/supplier-catalogue'

import SupplierEditModal from './modals/supplier-edit-modal'
import SupplierStatusModal from './modals/supplier-status-modal'
import SupplierDeleteModal from './modals/supplier-delete-modal'

import SupplierMock from './supplier.mock.js'

export default {
  name: 'Supplier',
  page: {
    title: 'Supplier',
  },
  components: {
    SupplierInformation,
    SupplierContracts,
    SupplierCatalogue,
    SupplierEditModal,
    SupplierStatusModal,
    SupplierDeleteModal,
  },
  data() {
    return {
      loading: false,
      modals: {
        editSupplier: false,
        updateStatus: false,
        addProduct: false,
        deleteSupplier: false,
      },
      activeTab: '',
      supplier: SupplierMock,
      tabs: [
        {
          label: 'Information',
          name: 'information',
        },
        {
          label: 'Contracts',
          name: 'contracts',
        },
        {
          label: 'Supplier Catalogue',
          name: 'catalogue',
        },
      ],
      commands: [
        {
          name: 'editSupplier',
          label: 'Edit Supplier',
        },
        {
          name: 'updateStatus',
          label: 'Update Status',
        },
        {
          name: 'addProduct',
          label: 'Add Supplier Product',
        },
        {
          name: 'deleteSupplier',
          label: 'Delete Supplier',
        },
      ]
    }
  },
  computed: {
    // ...mapState('supplier', ['supplier']),
    id() {
      return this.$route.params.id || null
    },
  },
  async created() {
    this.activeTab = this.$route.params.tab || 'information'
    // const [error,] = await this.getSupplier(this.id)
    // if (error) {
    //   this.$router.replace({ name: 'supplier-details' })
    //   console.error(error)
    // }
    this.loading = false
  },
  methods: {
    capitalize,
    // ...mapActions('supplier', ['getSupplier']),
    onTabChanged(tabName) {
      this.$router.push({
        name: 'supplier-details',
        params: {
          id: this.id,
          tab: tabName,
        },
      })
    },
    onMenuSelect(name) {
      if (name === 'addProduct') {
        this.$router.push({
          name: 'suppliers', // TBD route to create supplier product
        })
      } else {
        this.modals[name] = true
      }
    },
  },
}
</script>

<template>
  <main-layout
    :title="supplier.name"
    :back="{ name: 'suppliers' }"
    :loading="loading"
  >
    <el-dropdown
      slot="header"
      trigger="click"
      @command="onMenuSelect"
    >
      <el-button
        :class="$style.button"
        size="small"
      >
        <i
          class="el-icon-more"
          :class="$style.buttonIcon"
        />
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item
          v-for="(command, index) in commands"
          :key="index"
          :command="command.name"
        >
          {{ command.label }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-tabs
      :class="$style.tabs"
      :value="activeTab"
      @input="onTabChanged"
    >
      <el-tab-pane
        v-for="tab in tabs"
        :key="tab.name"
        :label="tab.label"
        :name="tab.name"
      >
        <component
          :is="`Supplier${capitalize(tab.name)}`"
          :loading="loading"
          :supplier="supplier"
        />
      </el-tab-pane>
    </el-tabs>
    <supplier-edit-modal
      v-if="modals.editSupplier"
      :supplier="supplier"
      :visible.sync="modals.editSupplier"
      modal-append-to-body
      append-to-body
    />
    <supplier-status-modal
      v-if="modals.updateStatus"
      :supplier="supplier"
      :visible.sync="modals.updateStatus"
      modal-append-to-body
      append-to-body
    />
    <supplier-delete-modal
      v-if="modals.deleteSupplier"
      :id="supplier.id"
      :visible.sync="modals.deleteSupplier"
      modal-append-to-body
      append-to-body
    />
  </main-layout>
</template>

<style lang="scss" module>
.button {
  height: 2rem;

  :global {
    .el-icon--right {
      margin-left: 0.6rem;
    }
  }
}

.buttonIcon {
  transform: rotate(90deg);
}

.tabs {
  :global {
    .el-tabs__header {
      padding: 0 var(--size-card-spacing) calc(var(--size-card-spacing) / 2);
    }
    .el-tabs__content {
      overflow: visible;
    }
  }
}

</style>
