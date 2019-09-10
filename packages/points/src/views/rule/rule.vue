<script>
import { formatDate } from '@lib/utils/format-date'
import DataBox from '~/components/data-box'
import DataList from '~/components/data-list'
import get from 'lodash/get'
import capitalize from 'lodash/capitalize'
import { mapActions, mapGetters } from 'vuex'

import RuleEditModal from './modals/rule-edit-modal'
import RuleRemoveModal from './modals/rule-remove-modal'

export default {
  name: 'RuleDetail',
  components: {
    DataBox,
    DataList,
    RuleEditModal,
    RuleRemoveModal,
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
        edit: false,
        remove: false,
      },
    }
  },
  computed: {
    ...mapGetters('rule', [
      'rule',
    ]),
    title() {
      return get(this.rule, 'name', '')
    },
    status() {
      const active = get(this.rule, 'active', false)
      return active ? 'active' : 'inactive'
    },
    type() {
      return capitalize(get(this.rule, 'type', '-'))
    },
    priority() {
      const priority = get(this.rule, 'priority')

      if (priority) {
        return priority < 10 ? `0${ priority }` : priority
      } else {
        return '-'
      }
    },
  },
  created() {
    this.fetchRuleData()
  },
  methods: {
    ...mapActions('rule', [
      'getRule',
      'setRule',
    ]),
    async fetchRuleData() {
      this.loading = true

      const [error] = await this.getRule(this.id)

      if (error) {
        this.$router.replace({ name: 'rules' })
      }

      this.loading = false
    },
    formatDate(value) {
      return formatDate(value, 'DD/MM/YYYY hh:mm')
    },
    async onRemoveSuccess() {
      this.modal.remove = false
      await this.$router.replace({ name: 'rules' })
      this.setRule(null)
    },
  },
}
</script>

<template>
  <main-layout
    :title="title"
    :loading="loading"
    :back="{ name: 'rules' }"
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
          Edit Rule
        </el-dropdown-item>
        <el-dropdown-item @click.native="modal.remove = true">
          Delete Rule
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

    <data-box
      header="Rule Details"
      :status="status"
    >
      <data-list v-if="!loading">
        <dt>Date Created</dt>
        <dd>{{ formatDate(rule.createdAt) }}</dd>

        <dt>Rule ID</dt>
        <dd>{{ rule.id || '-' }}</dd>

        <dt>Rule Name</dt>
        <dd>{{ rule.name || '-' }}</dd>

        <dt>Type</dt>
        <dd>{{ type }}</dd>

        <dt>Start At</dt>
        <dd>{{ formatDate(rule.startAt) }}</dd>

        <dt>Finish At</dt>
        <dd>{{ formatDate(rule.endAt) }}</dd>

        <dt>Priority</dt>
        <dd>{{ priority || 0 }}</dd>

        <dt>Rule Scope</dt>
        <dd>{{ rule.scope || '-' }}</dd>

        <dt>Provider Name</dt>
        <dd>{{ rule.provider || '-' }}</dd>

        <dt>Event</dt>
        <dd>
          <template v-if="rule.events.length > 0">
            <div
              v-for="event in rule.events"
              :key="event.id"
              :class="$style.eventItem"
            >
              {{ event.name }}
            </div>
          </template>
          <template v-else>
            -
          </template>
        </dd>

        <dt>Rule Expression</dt>
        <dd>{{ rule.expression || '-' }}</dd>

        <dt>Last Updated</dt>
        <dd>{{ formatDate(rule.updatedAt) }}</dd>
      </data-list>
    </data-box>

    <rule-edit-modal
      v-if="modal.edit"
      :visible.sync="modal.edit"
      :rule="rule"
      @success="modal.edit = false"
    />
    <rule-remove-modal
      v-if="modal.remove"
      :id="rule.id"
      :visible.sync="modal.remove"
      @success="onRemoveSuccess"
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

.eventItem {
  &:not(:first-child) {
    padding-top: 1rem;
  }
}
</style>
