<script>
import formatDollar from '@lib/utils/format-dollar'
import { formatDate } from '@lib/utils/format-date'

export default {
  name: 'SettlementDetailsBlock',
  props: {
    settlement: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      showWarning: true,
    }
  },
  computed: {
    settlementStatus() {
      const availableStatuses = {
        pending: {
          icon: 'el-icon-time',
          value: 'Pending',
          color: '#fbb241',
        },
        successful: {
          icon: 'el-icon-check',
          value: 'Successfull',
          color: '#29d737',
        },
        failed: {
          icon: 'el-icon-close',
          value: 'Failed',
          color: 'var(--color-error)',
        },
        5: {
          icon: 'el-icon-close',
          value: 'Failed',
          color: 'var(--color-error)',
        },
      }
      return availableStatuses[this.settlement.status]
    },
    customerName() {
      if (this.settlement) {
        const { customer } = this.settlement.order
        return `${customer.first_name} ${customer.last_name}`
      } else {
        return ''
      }
    },
    dataReady() {
      return Object.keys(this.settlement).length
    },
  },
  methods: {
    formatDollar(value) {
      return formatDollar(value)
    },
    formatDate(value, format) {
      return formatDate(value, format || 'DD/MM/YYYY hh:mm')
    },
  },
}
</script>

<template>
  <el-card
    v-loading="!dataReady"
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
      v-if="dataReady"
      :class="$style.status"
      :style="{ color: settlementStatus.color }"
    >
      <span :class="$style.statusSum">
        {{ `${formatDollar(settlement.amount.total)} AUD` }}
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
    <dl
      v-if="dataReady"
      class="datalist"
    >
      <dt>Date Created</dt>
      <dd>{{ formatDate(settlement.created_at) }}</dd>

      <dt>Customer ID</dt>
      <dd>{{ settlement.order.customer.id }}</dd>

      <dt>Customer Name</dt>
      <dd>{{ customerName }}</dd>

      <dt>Settlement Account</dt>
      <dd>{{ settlement.funding_source || '-' }}</dd>

      <dt>Transaction ID</dt>
      <dd>{{ settlement.id }}</dd>

      <dt>Description</dt>
      <dd>{{ settlement.statement_description }}</dd>

      <dt>Amount</dt>
      <dd>{{ formatDollar(settlement.amount.total) }}</dd>

      <dt>Fee</dt>
      <dd>{{ formatDollar(settlement.amount.fees) }}</dd>

      <dt>Net</dt>
      <dd>{{ formatDollar(settlement.amount.subtotal) }}</dd>

      <dt>Date Finalised</dt>
      <dd>{{ formatDate(settlement.completed_at) }}</dd>
    </dl>

    <div
      v-if="showWarning"
      :class="$style.warningWrapper"
    >
      <div :class="$style.warningHeader">
        <i class="el-icon-error" />
        <span :class="$style.warningTitle">
          This payout was returned by your bank. Reason given was: No account
        </span>
        <i
          class="el-icon-close"
          @click="showWarning = false"
        />
      </div>
      <div :class="$style.warningBody">
        <p>
          Please note that failed payment messages
          originate from the issuing bank.
          For any queries please contact the issuing
          bank to seek more informaton.
        </p>
        <p>
          This and all settlement will not be sent to
          your bank account until you update your bank account or manually
          resume your payouts.
        </p>
      </div>
    </div>
  </el-card>
</template>

<style lang="scss" module>
.detailsBlock {
  position: relative;
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

.warningWrapper {
  position: absolute;
  top: 2.3rem;
  right: 3rem;
  width: 24rem;
  padding: .5rem 1rem;
  color: var(--color-error);
  background-color: #FEF0F0;
  border-radius: rem(5px);
}

.warningTitle {
  margin: 0 .7rem;
  font-weight: 700;
}

.warningHeader {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  :global {
    .el-icon-error {
      font-size: 1.8rem;
    }
    .el-icon-close {
      font-size: 1.2rem;
      color: #000;
      cursor: pointer;
    }
  }
}

.warningBody {
  padding: 0 2.5rem;
}
</style>
