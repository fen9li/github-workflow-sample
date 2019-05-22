<script>
import formatDollar from '@lib/utils/format-dollar'

export default {
  name: 'SettlementDetailsBlock',
  props: {
    settlementDetails: {
      type: Object,
      required: true,
    },
  },
  computed: {
    settlementStatus() {
      const availableStatuses = {
        pending: {
          icon: 'el-icon-time',
          value: 'Pending',
          color: '#fbb241',
        },
        paid: {
          icon: 'el-icon-check',
          value: 'Successfull',
          color: '#29d737',
        },
        failed: {
          icon: 'el-icon-close',
          value: 'Failed',
          color: '#fc7168',
        },
      }
      return availableStatuses[this.settlementDetails.status]
    },
  },
  methods: {
    formatDollar(value) {
      return formatDollar(value)
    },
  },
}
</script>

<template>
  <el-card
    v-if="settlementDetails"
    :class="$style.detailsBlock"
  >
    <div
      slot="header"
      :class="$style.header"
    >
      <div>
        General Information
      </div>
    </div>
    <div
      :class="$style.status"
      :style="{ color: settlementStatus.color }"
    >
      <span :class="$style.statusSum">
        {{ `${formatDollar(settlementDetails.amount)} AUD` }}
      </span>
      <div
        v-if="settlementStatus"
        :class="$style.statusValue"
      >
        <i
          :class="[
            settlementStatus.icon,
          ]"
        />
        {{ settlementStatus.value }}
      </div>
    </div>
    <dl class="datalist">
      <dt>Date Created</dt>
      <dd>{{ settlementDetails.date_created }}</dd>

      <dt>Customer ID</dt>
      <dd>{{ settlementDetails.customer_id }}</dd>

      <dt>Customer Name</dt>
      <dd>{{ settlementDetails.customer_name }}</dd>

      <dt>Settlement Account</dt>
      <dd>{{ settlementDetails.settlement_account }}</dd>

      <dt>Transaction ID</dt>
      <dd>{{ settlementDetails.transaction_id }}</dd>

      <dt>Description</dt>
      <dd>{{ settlementDetails.description }}</dd>

      <dt>Amount</dt>
      <dd>{{ formatDollar(settlementDetails.amount) }}</dd>

      <dt>Fee</dt>
      <dd>{{ formatDollar(settlementDetails.fee) }}</dd>

      <dt>Net</dt>
      <dd>{{ formatDollar(settlementDetails.net) }}</dd>

      <dt>Date Finalised</dt>
      <dd>{{ settlementDetails.date_finalised }}</dd>
    </dl>
  </el-card>
</template>

<style lang="scss" module>
.detailsBlock {
  margin-bottom: 2rem;
}

.status {
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
}

.statusSum {
  width: 15rem;
  font-size: 1.5rem;
}

.statusValue {
  font-size: 1rem;
}
</style>
