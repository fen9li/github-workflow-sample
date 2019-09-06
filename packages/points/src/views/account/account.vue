<script>
import { mapActions } from 'vuex'
import capitalize from 'lodash/capitalize'
import AccountInformation from './tabs/account-information'
import AccountBadges from './tabs/account-badges'
import AccountMembership from './tabs/account-membership'
import AccountMetadata from './tabs/account-metadata'
import AccountEvents from './tabs/account-events'

import UpdateMembership from './modals/update-membership'
import AddBadge from './modals/add-badge'
import AddMetadata from './modals/add-metadata'
import ManualAdjustment from './modals/manual-adjustment'
import DeleteAccount from './modals/delete-account'

export default {
  name: "AccountPoints",
  components: {
    AccountInformation,
    AccountBadges,
    AccountMembership,
    AccountMetadata,
    AccountEvents,
    UpdateMembership,
    AddBadge,
    AddMetadata,
    ManualAdjustment,
    DeleteAccount,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      account: {},
      activeTab: '',
      loading: true,
      modals: {
        updateMembership: false,
        addBadge: false,
        addMetadata: false,
        manualAdjustment: false,
        deleteAccount: false,
      },
      tabs: [
        {
          label: 'Information',
          name: 'information',
        },
        {
          label: 'Badges',
          name: 'badges',
        },
        {
          label: 'Membership History',
          name: 'membership',
        },
        {
          label: 'Metadata',
          name: 'metadata',
        },
        {
          label: 'Event Occurences',
          name: 'events',
        },
      ],
      commands: [
        {
          name: 'updateMembership',
          label: 'Update Membership',
        },
        {
          name: 'addBadge',
          label: 'Add Badge',
        },
        {
          name: 'addMetadata',
          label: 'Add Metadata',
        },
        {
          name: 'manualAdjustment',
          label: 'Manual Adjustment',
        },
        {
          name: 'deleteAccount',
          label: 'Delete Account',
        },
      ]
    }
  },
  created() {
    this.activeTab = this.$route.params.tab || 'information'
    this.getAccountData()
  },
  methods: {
    ...mapActions('account', [
      'getAccount'
    ]),
    capitalize,
    async getAccountData(){
      const [, response] = await this.getAccount(this.id)
      if (response) {
        this.account = { ...response }
      }
      this.loading = false
    },
    onTabChanged(tabName) {
      this.$router.push({
        name: 'account',
        params: {
          id: this.id,
          tab: tabName,
        },
      })
    },
    onMenuSelect(name) {
      this.modals[name] = true
    },
    onAccountDelete() {
      this.progress = true
    }
  },
}
</script>

<template>
  <main-layout
    :title="`Account ${id}`"
    :back="{ name: 'accounts' }"
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
          :is="`Account${capitalize(tab.name)}`"
          :loading="loading"
          :account="account"
        />
      </el-tab-pane>
    </el-tabs>

    <update-membership
      v-if="modals.updateMembership"
      :id="account.id"
      :visible.sync="modals.updateMembership"
      @close-modal="modals.updateMembership = false"
    />

    <add-badge
      v-if="modals.addBadge"
      :id="account.id"
      :visible.sync="modals.addBadge"
      @close-modal="modals.addBadge = false"
    />

    <add-metadata
      v-if="modals.addMetadata"
      :id="account.id"
      :visible.sync="modals.addMetadata"
      @close-modal="modals.addMetadata = false"
    />

    <manual-adjustment
      v-if="modals.manualAdjustment"
      :id="account.id"
      :visible.sync="modals.manualAdjustment"
      @close-modal="modals.manualAdjustment = false"
    />

    <delete-account
      v-if="modals.deleteAccount"
      :id="account.id"
      :visible.sync="modals.deleteAccount"
      @close-modal="modals.deleteAccount = false"
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
