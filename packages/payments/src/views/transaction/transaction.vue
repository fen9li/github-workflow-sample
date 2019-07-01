<script>
import appConfig from '~/app.config'
import TransactionRefund from './transaction-refund.vue'
import mockedData from '@tests/__fixtures__/transactions-details.js'
import formatDollar from '@lib/utils/format-dollar'
import { formatDate } from '@lib/utils/format-date'

const availableStatuses = {
  pending: {
    icon: 'el-icon-time',
    color: '#fbb241',
    label: 'Pending',
  },
  settled: {
    icon: 'el-icon-check',
    color: '#29d737',
    label: 'Successful',
  },
  refund: {
    icon: 'el-icon-close',
    color: 'var(--color-error)',
    label: 'Refund',
  },
  failed: {
    icon: 'el-icon-close',
    color: 'var(--color-error)',
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
    TransactionRefund,
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
      modal: {
        refund: false,
      },
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
    paymentSys() {
      return this.transactionDetails.paymentDetails.paymentSystem
    },
    paymentSysLogo() {
      return `/img/${this.paymentSys}_logo.png`
    },
    productDetails() {
      return {
        type: this.transactionDetails.productType,
        ...this.transactionDetails.productDetails,
      }
    },
  },
  methods: {
    formatDollar(value) {
      return formatDollar(value)
    },
    formatDate(value) {
      return formatDate(value, 'DD/MM/YYYY hh:mm A')
    },
    goToDetails(name) {
      if (name === 'customer') {
        if (!this.transactionDetails) return

        this.$router.push({
          name: 'customer-details',
          params: { id: this.transactionDetails.customerIntegrationId },
        })
      } else if (name === 'subscription') {
        this.$router.push({
          name: 'subscription-details',
          params: { id: this.transactionDetails.productDetails.productCode },
        })
      }
    },
  },
}
</script>

<template>
  <main-layout
    title="Transactions Details"
    back
  >
    <transaction-refund
      v-if="modal.refund"
      :visible.sync="modal.refund"
      :transaction="transactionDetails"
    />
    <el-button
      v-if="status === 'settled'"
      slot="header"
      type="primary"
      class="wide-button"
      @click="modal.refund = true"
    >
      Refund
    </el-button>
    <el-card
      v-if="transactionDetails"
      :class="$style.detailsBlock"
    >
      <div class="info-block">
        <span class="info-block__title">
          General Information
        </span>
        <div
          :class="$style.header"
        >
          <div
            :class="$style.headerData"
            :style="{ color: transactionStatus.color }"
          >
            <div :class="$style.amount">
              <span>{{ `${formatDollar(transactionDetails.amount)} AUD` }}</span>
            </div>

            <div
              v-if="status && status !== 'refund'"
              :class="$style.headerStatus"
            >
              <i :class="[transactionStatus.icon, $style.statusIcon]" />
              {{ transactionStatus.label }}
            </div>
          </div>
          <div
            v-if="status === 'refund'"
            :class="$style.refund"
          >
            Refund
          </div>
        </div>
        <dl :class="['datalist', $style.list]">
          <dt>Date Created</dt>
          <dd>{{ formatDate(transactionDetails.created) }}</dd>

          <dt>Description</dt>
          <dd>{{ transactionDetails.description }}</dd>

          <dt>Amount</dt>
          <dd>{{ formatDollar(transactionDetails.amount) }}</dd>

          <dt>Fee</dt>
          <dd>{{ formatDollar(transactionDetails.fee) }}</dd>

          <dt>Net</dt>
          <dd>{{ formatDollar(transactionDetails.netAmount) }}</dd>

          <dt>Transaction ID</dt>
          <dd>{{ transactionDetails.transactionId }}</dd>

          <dt>Date Finalised</dt>
          <dd>{{ formatDate(transactionDetails.dateFinalised) }}</dd>
        </dl>
      </div>
      <hr :class="['divider-primary', 'info-block__divider']">

      <div class="info-block__wrapper">
        <div class="info-block">
          <span class="info-block__title">
            Customer Details
          </span>

          <dl
            v-if="transactionDetails.customerIntegrationId"
            :class="['datalist', 'info-block__flex-list']"
          >
            <dt>Customer ID</dt>
            <dd>{{ transactionDetails.customerIntegrationId }}</dd>

            <dt>Customer Name</dt>
            <dd>{{ transactionDetails.customerName }}</dd>

            <dt>Customer Email</dt>
            <dd>{{ transactionDetails.customerEmailAddress }}</dd>
          </dl>

          <span
            v-else
            class="info-block__empty"
          >
            No information provided
          </span>
        </div>

        <div
          v-if="transactionDetails.customerIntegrationId"
          :class="$style.viewBtn"
        >
          <el-button
            type="primary"
            @click="goToDetails('customer')"
          >
            View Customer Details
          </el-button>
        </div>
      </div>
      <hr :class="['divider-primary', 'info-block__divider']">

      <div v-if="productDetails.type === 'subscription'">
        <div
          class="info-block__wrapper"
        >
          <div class="info-block">
            <span class="info-block__title">
              Subscription Details
            </span>

            <dl
              v-if="transactionDetails.customerIntegrationId"
              :class="['datalist', 'info-block__flex-list']"
            >
              <dt>Start Date</dt>
              <dd>{{ `${formatDate(productDetails.startDate)}` }}</dd>

              <dt>End Date</dt>
              <dd>{{ `${formatDate(productDetails.endDate)}` }}</dd>

              <dt>Product Name</dt>
              <dd>{{ productDetails.productName }}</dd>

              <dt>Product Code</dt>
              <dd>{{ productDetails.productCode }}</dd>

              <dt>Billing Cycle</dt>
              <dd>{{ productDetails.billingCycle }}</dd>

              <dt>Amount</dt>
              <dd>{{ `${formatDollar(productDetails.pricingPlan)}` }}</dd>

              <dt>Frequency</dt>
              <dd>{{ productDetails.billingInterval }}</dd>

              <dt>Next Billing Date</dt>
              <dd>{{ `${formatDate(productDetails.nextBillingDate)}` }}</dd>

              <dt>Coupon</dt>
              <dd>{{ productDetails.coupon }}</dd>

              <dt>Valid Until</dt>
              <dd>{{ `${formatDate(productDetails.validUntil)}` }}</dd>
            </dl>

            <span
              v-else
              class="info-block__empty"
            >
              No information provided
            </span>
          </div>

          <div
            v-if="transactionDetails.customerIntegrationId"
            :class="$style.viewBtn"
          >
            <el-button
              type="primary"
              @click="goToDetails('subscription')"
            >
              View Subscription Details
            </el-button>
          </div>
        </div>
        <hr :class="['divider-primary', 'info-block__divider']">
      </div>

      <div class="info-block">
        <span class="info-block__title">
          Payment Details
        </span>
        <dl class="datalist">
          <dt>Card Holder Name</dt>
          <dd>{{ transactionDetails.paymentDetails.cardHolderName }}</dd>

          <dt>Payment Method</dt>
          <dd>
            <div class="info-block__pay-method">
              {{ transactionDetails.paymentDetails.paymentMethod }}
              <div class="info-block__pay-logo">
                <img
                  :src="paymentSysLogo"
                  :alt="paymentSys"
                  class="info-block__pay-img"
                >
              </div>
            </div>
          </dd>

          <dt>Token</dt>
          <dd>{{ transactionDetails.token }}</dd>
        </dl>
      </div>
      <div
        v-if="status === 'failed'"
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
    </el-card>
  </main-layout>
</template>

<style lang="scss" module>
.warn {
  max-width: 25rem;
  padding: 1.3rem;
  text-align: right;
  background: #fff1f1;
  border-radius: 0.7rem;
}

.warnMeta {
  font-weight: bold;
}

.warnDescription {
  margin-top: 1rem;
  font-size: .7rem;
}

.detailsBlock {
  margin-bottom: 2rem;
}

.header {
  padding-top: 1.2rem;
}

.headerData {
  display: flex;
}

.amount {
  width: 15rem;
  font-size: 1.5rem;
}

.headerStatus {
  display: flex;
  align-items: center;
  font-size: 1rem;
  font-weight: 700;
}

.statusIcon {
  margin-right: .5rem;
}

.refund {
  margin-top: 0.3rem;
  font-size: 1rem;
  color: var(--color-error);
}

.viewBtn {
  margin-left: auto;
}
</style>
