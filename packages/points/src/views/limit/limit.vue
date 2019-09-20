<script>
import capitalize from 'lodash/capitalize'
import { mapActions, mapState } from 'vuex'
import { formatDate } from '@lib/utils/format-date'
import DataBox from '@lib/components/data-box'
import DataList from '@lib/components/data-list'

import CreateLimitModal from '../limits/modals/create-limit-modal'
import DeleteLimitModal from './modals/delete-limit-modal'

export default {
  name: 'LimitDetail',
  components: {
    DeleteLimitModal,
    DataBox,
    DataList,
    CreateLimitModal,
  },
  props: {
    limitId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
      modal: {
        edit: false,
        delete: false,
      },
    }
  },
  computed: {
    ...mapState('globalLimit', ['globalLimit']),
    title() {
      const { globalLimit } = this

      if (globalLimit) {
        return globalLimit.name
      }

      return ''
    },
  },
  created() {
    this.fetchLimitData()
  },
  methods: {
    ...mapActions('globalLimit', ['getGlobalLimit']),
    async fetchLimitData() {
      this.loading = true

      const [err] = await this.getGlobalLimit(this.limitId)

      if (err) {
        this.$router.replace({ name: 'limits' })
      }

      this.loading = false
    },
    formatDate(value) {
      return formatDate(value, 'DD/MM/YYYY hh:mm')
    },
    capitalize,
  },
}
</script>

<template>
  <main-layout
    :title="title"
    :loading="loading"
    :back="{ name: 'limits' }"
  >
    <el-dropdown
      slot="header"
      trigger="click"
    >
      <div :class="$style.drop">
        <i class="el-icon-more" />
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click.native="modal.edit = true">
          Edit Limit
        </el-dropdown-item>
        <el-dropdown-item @click.native="modal.delete = true">
          Delete Limit
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

    <data-box header="Limit Details">
      <data-list v-if="!loading">
        <dt>Date Created</dt>
        <dd>{{ formatDate(globalLimit.createdAt) }}</dd>

        <dt>Limit ID</dt>
        <dd>{{ globalLimit.id }}</dd>

        <dt>Limit Name</dt>
        <dd>{{ globalLimit.name }}</dd>

        <dt>Limit Type</dt>
        <dd>{{ capitalize(globalLimit.type) }}</dd>

        <dt>Priority</dt>
        <dd>{{ globalLimit.priority }}</dd>

        <dt>Strict</dt>
        <dd>{{ globalLimit.strict ? 'Yes' : 'No' }}</dd>

        <dt>Start At</dt>
        <dd>{{ formatDate(globalLimit.startAt) }}</dd>

        <dt>Finish At</dt>
        <dd>{{ formatDate(globalLimit.endAt) }}</dd>

        <dt>Event Limit</dt>
        <dd>{{ globalLimit.eventId ? 'Yes' : 'No' }}</dd>

        <dt>Provider Name</dt>
        <dd>{{ globalLimit.providerName }}</dd>

        <dt>Event</dt>
        <dd v-if="!globalLimit.events || !globalLimit.events.length">
          —
        </dd>
        <dd v-else>
          <div
            v-for="event in globalLimit.events"
            :key="event.id"
          >
            {{ event.id }}
          </div>
        </dd>

        <dt>Limit Expression</dt>
        <dd>{{ globalLimit.expression }}</dd>

        <dt>Last Updated</dt>
        <dd>{{ formatDate(globalLimit.updatedAt) }}</dd>
      </data-list>
    </data-box>

    <create-limit-modal
      v-if="modal.edit"
      :visible.sync="modal.edit"
      :limit="globalLimit"
      is-edit
      @close-modal="modal.edit = false"
    />

    <delete-limit-modal
      v-if="modal.delete"
      :visible.sync="modal.delete"
      :limit="globalLimit"
      @close-modal="modal.delete = false"
      @done="$router.replace({ name: 'limits' })"
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
