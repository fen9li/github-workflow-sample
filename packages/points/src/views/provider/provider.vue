<script>
import { formatDate } from '@lib/utils/format-date'
import { mapActions, mapState } from 'vuex'
import DataBox from '@lib/components/data-box'
import DataList from '@lib/components/data-list'

import EditProviderModal from './modals/edit-provider-modal'

export default {
  name: 'ProviderDetail',
  components: {
    DataBox,
    DataList,
    EditProviderModal
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
      modal: {
        addRule: false,
        addLimit: false,
        addMembership: false,
        addBadge: false,
        editProvider: false,
      },
    }
  },
  computed: {
    ...mapState('provider', ['provider']),
    title() {
      const { provider } = this

      if (provider) {
        return provider.name
      }

      return ''
    },
    status() {
      const { provider } = this

      if (provider) {
        return provider.status
      }

      return ''
    },
  },
  created() {
    this.fetchProviderData()
  },
  methods: {
    ...mapActions('provider', ['getProvider']),
    async fetchProviderData() {
      this.loading = true

      const [err] = await this.getProvider(this.id)

      if (err) {
        this.$router.replace({ name: 'providers' })
      }

      this.loading = false
    },
    formatDate(value) {
      return formatDate(value, 'DD/MM/YYYY hh:mm')
    },
  },
}
</script>

<template>
  <main-layout
    :title="title"
    :loading="loading"
    :back="{ name: 'providers' }"
  >
    <el-dropdown
      slot="header"
      trigger="click"
    >
      <div :class="$style.drop">
        <i class="el-icon-more" />
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click.native="modal.addRule = true">
          Add Rule
        </el-dropdown-item>
        <el-dropdown-item @click.native="modal.addLimit = true">
          Add Limit
        </el-dropdown-item>
        <el-dropdown-item @click.native="modal.addMembership = true">
          Add Membership
        </el-dropdown-item>
        <el-dropdown-item @click.native="modal.addBadge = true">
          Add Badge
        </el-dropdown-item>
        <el-dropdown-item @click.native="modal.editProvider = true">
          Edit Provider
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

    <data-box
      header="Provider Details"
      :status="status"
    >
      <data-list v-if="!loading">
        <dt>Date Created</dt>
        <dd>{{ formatDate(provider.createdAt) }}</dd>

        <dt>Provider ID</dt>
        <dd>{{ provider.id }}</dd>

        <dt>Provider Name</dt>
        <dd>{{ provider.name }}</dd>

        <dt>Label</dt>
        <dd>{{ provider.label }}</dd>

        <dt>Logo</dt>
        <dd
          v-if="provider.logo"
          :class="$style.logo"
          :style="`background-image: url('${provider.logo}')`"
        />
        <dd v-else>
          —
        </dd>

        <dt>Schedule Rate</dt>
        <dd>{{ provider.scheduledRate ? 'Enabled' : 'Disabled' }}</dd>

        <dt>Schedule Date</dt>
        <dd>{{ formatDate(provider.scheduledRate) }}</dd>

        <dt>Earn Rate</dt>
        <dd>{{ provider.earnRate }}</dd>

        <dt>Burn Rate</dt>
        <dd>{{ provider.burnRate }}</dd>

        <dt>Last Updated</dt>
        <dd>{{ formatDate(provider.updatedAt) }}</dd>
      </data-list>
    </data-box>

    <edit-provider-modal
      v-if="modal.editProvider"
      :visible.sync="modal.editProvider"
      :provider="provider"
      @close-modal="modal.editProvider = false"
    />
  </main-layout>
</template>

<style lang="scss" module>
.logo {
  height: 3rem;
  padding: 0;
  margin-top: 1rem !important;
  margin-bottom: 1rem !important;
  background-repeat: no-repeat;
  background-position: center left;
  background-size: contain;
}

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
