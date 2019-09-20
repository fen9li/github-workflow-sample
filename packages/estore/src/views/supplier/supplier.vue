<script>
// import { mapActions, mapState } from 'vuex'
import capitalize from 'lodash/capitalize'

import HeaderDropdown from '~/components/header-dropdown'

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
    HeaderDropdown,
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
      dropdownItems: [
        {
          label: 'Edit Supplier',
          action: () => this.onMenuSelect('editSupplier'),
        }, {
          label: 'Update Status',
          action: () => this.onMenuSelect('updateStatus'),
        }, {
          label: 'Add Supplier Product',
          action: () => this.onMenuSelect('addProduct'),
        }, {
          label: 'Delete Supplier',
          action: () => this.onMenuSelect('deleteSupplier'),
        },
      ],
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
    <header-dropdown
      slot="header"
      :items="dropdownItems"
    />
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
