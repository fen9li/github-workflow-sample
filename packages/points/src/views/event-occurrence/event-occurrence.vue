<script>
import { formatDate } from '@lib/utils/format-date'
import capitalize from 'lodash/capitalize'
import detailsMock from '@tests/__fixtures__/event-occurrence'
import eventOccurrenceLog from './event-occurrence-log'
import { mapActions } from 'vuex'
import DataBox from '@lib/components/data-box'
import DataList from '@lib/components/data-list'

const allStatuses = {
  approved: {
    icon: 'check',
    label: 'Approved',
    color: '#29d737'
  },
  completed: {
    icon: 'check',
    label: 'Completed',
    color: '#909399'
  },
  pending: {
    icon: 'check',
    label: 'Pending',
    color: '#F7960D'
  },
  failed: {
    icon: 'check',
    label: 'Failed',
    color: '#fc1e1e'
  },
}

export default {
  name: 'EventOccurrenceDetailsPoints',
  components: {
    DataBox,
    DataList,
    eventOccurrenceLog
  },
  props: {
    id: {
      type: String,
      required: true,
    }
  },
  data() {
    return {
      loading: false,
      details: {}
    }
  },
  computed: {
    limitsApplied() {
      const { strictLimitsUsed, flexibleLimitsUsed } = this.details
      return strictLimitsUsed.length + flexibleLimitsUsed.length
    },
    statusObj() {
      return allStatuses[this.details.status]
    }
  },
  created() {
    this.getData()
  },
  methods: {
    ...mapActions('eventOccurrence', ['approveEventOccurrence']),
    getData() {
      this.details = detailsMock
    },
    onApproveClick() {
      this.approveEventOccurrence(this.id)
    },
    capitalize,
    formatDate(value) {
      return formatDate(value, 'DD/MM/YYYY hh:mm')
    },
  }
}
</script>

<template>
  <main-layout
    :title="`${details.id} - ${details.eventName}`"
    :loading="loading"
    :back="{ name: 'event-occurrences' }"
  >
    <el-button
      v-if="details.status === 'pending'"
      slot="header"
      type="primary"
      @click="onApproveClick"
    >
      Approve Event Occurrence
    </el-button>
    <data-box
      header="Event Occurrence Details"
      :status="statusObj"
    >
      <data-list v-if="!loading">
        <dt>Date Created</dt>
        <dd>{{ formatDate(details.createdAt) }}</dd>

        <dt>Occurrence ID</dt>
        <dd>{{ details.id }}</dd>

        <dt>Points Earned</dt>
        <dd>{{ details.pointsEarned }}</dd>

        <dt>Provider Name</dt>
        <dd>{{ details.providerName }}</dd>

        <dt>Account ID</dt>
        <dd>{{ details.accountId }}</dd>

        <dt>Event Name</dt>
        <dd>{{ details.eventName }}</dd>

        <dt>Type</dt>
        <dd>{{ capitalize(details.type) }}</dd>

        <dt>Rules Applied</dt>
        <dd>{{ details.rulesUsed.length }}</dd>

        <dt>Limits Applied</dt>
        <dd>{{ limitsApplied }}</dd>

        <dt>Badges Earned</dt>
        <dd>{{ details.badgesEarned }}</dd>

        <dt>Membership Earned</dt>
        <dd>{{ details.membershipEarned }}</dd>

        <dt>Date Created</dt>
        <dd>{{ formatDate(details.updatedAt) }}</dd>

        <dt>Created At</dt>
        <dd>{{ formatDate(details.createdAt) }}</dd>
      </data-list>

      <hr :class="['divider-primary', $style.divider]">

      <event-occurrence-log
        :details="details"
      />
    </data-box>
  </main-layout>
</template>

<style lang="scss" module>
.divider {
  margin: 2rem 0;
}
</style>
