<script>
import appConfig from '@src/app.config'
import MainLayout from '@layouts/main/main-layout.vue'
import TransactionsRefundModal from './transactions-refund-modal.vue'
import mockedData from '@/tests/mock-api/resources/transactions-details.js'
import formatDollar from '@utils/format-dollar'
import { formatDate } from '@utils/format-date'

const availableStatuses = {
  Pending: {
    icon: 'el-icon-time',
    color: '#fbb241',
    label: 'Pending',
  },
  Finalised: {
    icon: 'el-icon-check',
    color: '#29d737',
    label: 'Successful',
  },
  Refund: {
    icon: 'el-icon-check',
    color: '#29d737',
    label: 'Successful',
  },
  Failed: {
    icon: 'el-icon-close',
    color: '#fc7168',
    label: 'Failed',
  },
}

export default {
  name: 'TransactionDetails',
  page: {
    title: 'Transaction Details',
    meta: [{ name: 'description', content: appConfig.description }],
  },
  components: {
    MainLayout,
    TransactionsRefundModal,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      transactionDetails: mockedData,
    }
  },
  computed: {
    transactionStatus() {
      const { status } = this.transactionDetails

      return availableStatuses[status]
    },
    status() {
      const { status } = this.transactionDetails

      if (status) {
        return status
      }

      return ''
    },
  },
  methods: {
    formatDollar(value) {
      return formatDollar(value)
    },
    formatDate(value) {
      return formatDate(value, 'DD/MM/YYYY hh:mm A')
    },
  },
}
</script>

<template>
  <main-layout
    title="Transactions Details"
    back
  >
    <transactions-refund-modal
      v-if="status === 'Finalised'"
      slot="header"
    />
    <el-card
      v-if="transactionDetails"
      :class="$style.detailsBlock"
    >
      <div
        slot="header"
        :class="$style.header"
      >
        <div :class="$style.amount">
          <div>{{ `${formatDollar(transactionDetails.amount)} AUD` }}</div>
          <div
            v-if="status === 'Refund'"
            :class="$style.refund"
          >
            Refund
          </div>
        </div>
        <div
          v-if="transactionStatus"
          :class="$style.headerStatus"
          :style="{ color: transactionStatus.color }"
        >
          <i :class="transactionStatus.icon" />
          {{ transactionStatus.label }}
        </div>
      </div>
      <div :class="$style.wrap">
        <dl :class="['datalist', $style.list]">
          <dt>Date Created</dt>
          <dd>{{ formatDate(transactionDetails.created) }}</dd>

          <dt>Customer ID</dt>
          <dd>{{ transactionDetails.customerIntegrationId }}</dd>

          <dt>Customer Name</dt>
          <dd>{{ transactionDetails.customerName }}</dd>

          <dt>Customer Email</dt>
          <dd>{{ transactionDetails.customerEmailAddress }}</dd>

          <dt>Payment Method</dt>
          <dd>{{ transactionDetails.paymentSource }}</dd>

          <dt>Token</dt>
          <dd>{{ transactionDetails.token }}</dd>

          <dt>Transaction ID</dt>
          <dd>{{ transactionDetails.transactionId }}</dd>

          <dt>Order ID</dt>
          <dd>{{ transactionDetails.orderId }}</dd>

          <dt>Description</dt>
          <dd>{{ transactionDetails.description }}</dd>

          <dt>Amount</dt>
          <dd>{{ formatDollar(transactionDetails.amount) }}</dd>

          <dt>Fee</dt>
          <dd>{{ formatDollar(transactionDetails.fee) }}</dd>

          <dt>Net</dt>
          <dd>{{ formatDollar(transactionDetails.netAmount) }}</dd>

          <dt>Date Finalised</dt>
          <dd>{{ formatDate(transactionDetails.dateFinalised) }}</dd>
        </dl>
        <div
          v-if="status === 'Failed'"
          :class="$style.warn"
        >
          Payment declined by customer’s bank due to
          <div :class="$style.warnMeta">
            Insufficient_funds
          </div>
          <div :class="$style.warnDescription">
            Please note that failed payment messages originate
            from the issuing bank.
            For any queries please contact the issuing
            bank to seek more information.
          </div>
        </div>
      </div>
    </el-card>
  </main-layout>
</template>

<style lang="scss" module>
  @import '@design';

  .wrap {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }

  .warn {
    padding: 1.3rem;
    text-align: right;
    background: #fff1f1;
    border-radius: 13px;
  }

  .warnMeta {
    font-weight: bold;
  }

  .warnDescription {
    margin-top: 1rem;
    font-size: 12px;
  }

  .detailsBlock {
    margin-bottom: 2rem;
  }

  .header {
    display: flex;
  }

  .amount {
    width: 15rem;
    font-size: 1.5rem;
  }

  .headerStatus {
    font-size: 1rem;
    font-weight: bold;
  }

  .refund {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: .1rem 2rem;
    margin-top: .8rem;
    font-size: 16px;
    font-weight: normal;
    color: $color-body-bg;
    background: $color-error;
    border-radius: 12px;
  }

  .list {
    dt {
      color: black;
    }
  }
</style>
