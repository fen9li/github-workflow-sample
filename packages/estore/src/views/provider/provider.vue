<script>
import providerDataMock from '@tests/__fixtures__/provider'

import capitalize from 'lodash/capitalize'
import ProviderInformation from './tabs/provider-information'
import ProviderContracts from './tabs/provider-contracts'
import ProviderCatalogue from './tabs/provider-catalogue'
import ProviderCategories from './tabs/provider-categories'
import ProdiderEdit from './provider-edit-modal'

export default {
  name: "ProviderDetails",
  components: {
    ProviderInformation,
    ProviderContracts,
    ProviderCatalogue,
    ProviderCategories,
    ProdiderEdit
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      provider: providerDataMock,
      activeTab: '',
      loading: false,
      modals: {
        editDetails: false,
      },
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
          label: 'Provider Catalogue',
          name: 'catalogue',
        },
        {
          label: 'Products Categories',
          name: 'categories',
        },
      ],
      commands: [
        {
          name: 'addContract',
          label: 'Add Contract',
        },
        {
          name: 'editCategories',
          label: 'Edit Product Categories',
        },
        {
          name: 'editDetails',
          label: 'Edit Provider Details',
        },
      ]
    }
  },
  created() {
    this.activeTab = this.$route.params.tab || 'information'
  },
  methods: {
    capitalize,
    onTabChanged(tabName) {
      this.$router.push({
        name: 'provider-details',
        params: {
          id: this.id,
          tab: tabName,
        },
      })
    },
    onMenuSelect(name) {
      this.modals[name] = true
    },
  },
}
</script>

<template>
  <main-layout
    :title="provider.name"
    :back="{ name: 'providers' }"
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
          :is="`Provider${capitalize(tab.name)}`"
          :loading="loading"
          :provider="provider"
        />
      </el-tab-pane>
    </el-tabs>

    <prodider-edit
      v-if="modals.editDetails"
      :provider="provider"
      :visible.sync="modals.editDetails"
      @close-modal="modals.editDetails = false"
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
