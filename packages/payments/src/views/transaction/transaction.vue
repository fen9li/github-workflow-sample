<script>
import appConfig from '~/app.config'
import TransactionRefund from './transaction-refund.vue'
import formatDollar from '@lib/utils/format-dollar'
import { formatDate } from '@lib/utils/format-date'
import customerDetails from '../subscription/information/blocks/customer-details'
import subscriptionDetails from '../subscription/information/blocks/subscription-details'
import productDetails from '../product-single/product-single-details'
import paymentDetails from '../subscription/information/blocks/payment-details'
import capitalize from 'lodash/capitalize'
import get from 'lodash/get'

const availableStatuses = {
  pending: {
    icon: 'el-icon-time',
    color: '#fbb241',
    label: 'Pending',
  },
  completed: {
    icon: 'el-icon-check',
    color: '#29d737',
    label: 'Successful',
  },
  finalised: {
    icon: 'el-icon-check',
    color: '#29d737',
    label: 'Finalised',
  },
  refund: {
    icon: 'el-icon-close',
    color: 'var(--color-error)',
    label: 'Refund',
  },
  3: {
    icon: 'el-icon-close',
    color: '#f00',
    label: 'Failed',
  },
}

// failed = 3 / completed = 4 / pending = 1 / unknown = 5

export default {
  name: 'TransactionDetails',
  page: {
    title: 'Transaction Details',
    meta: [{ name: 'description', content: appConfig.description }],
  },
  components: {
    TransactionRefund,
    customerDetails,
    subscriptionDetails,
    productDetails,
    paymentDetails,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      transaction: {},
      subscription: {},
      modal: {
        refund: false,
      },
      loading: false,
      ready: false,
    }
  },
  computed: {
    transactionStatus() {
      const { status } = this.transaction

      return availableStatuses[status] || {}
    },
    paymentSource() {
      const { transaction } = this
      return transaction.funding_source
    },
  },
  created() {
    this.getAllData()
  },
  methods: {
    capitalize,
    formatDollar(value) {
      return formatDollar(value)
    },
    formatDate(value) {
      return formatDate(value, 'DD/MM/YYYY hh:mm A')
    },
    async getTransactionDetails() {
      this.loading = true
      const [, response] = await this.$api.get(`/transactions/${this.id}`)
      if (response) {
        this.transaction = { ...response }
      }
      return response
    },
    async getSubscriptionDetails(id) {
      const [, response] = await this.$api.get(`/subscriptions/${id}`)
      if (response) {
        this.subscription = { ...response }
      }
      this.loading = false
      this.ready = true
    },
    getAllData() {
      this.getTransactionDetails().then(response => {
        if (get(response, 'order.subscription')) {
          this.getSubscriptionDetails(response.order.subscription.id)
        } else {
          this.loading = false
          this.ready = true
        }
      })
    }
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
      :transaction="transaction"
      @updated="getAllData"
    />
    <el-button
      v-if="transactionStatus.label === 'Successful'"
      slot="header"
      type="primary"
      class="wide-button"
      @click="modal.refund = true"
    >
      Refund
    </el-button>
    <el-card
      v-loading="loading"
      :class="$style.detailsBlock"
    >
      <div
        v-if="!loading && ready"
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
                <span>{{ `${formatDollar(transaction.amount.total)} AUD` }}</span>
              </div>

              <div
                v-if="transactionStatus.label !== 'Refund'"
                :class="$style.headerStatus"
              >
                <i :class="[transactionStatus.icon, $style.statusIcon]" />
                {{ transactionStatus.label }}
              </div>
            </div>
            <div
              v-if="transactionStatus.label === 'Refund'"
              :class="$style.refund"
            >
              Refund
            </div>
          </div>
          <dl class="datalist">
            <dt>Date Created</dt>
            <dd>{{ formatDate(transaction.created_at) }}</dd>

            <dt>Type</dt>
            <dd>{{ capitalize(transaction.type) }}</dd>

            <dt>Description</dt>
            <dd>{{ transaction.order.description || '-' }}</dd>

            <dt>Amount</dt>
            <dd>{{ formatDollar(transaction.amount.total) }}</dd>

            <dt>Fee</dt>
            <dd>{{ formatDollar(transaction.amount.fees) }}</dd>

            <dt>Net</dt>
            <dd>{{ formatDollar(transaction.amount.subtotal) }}</dd>

            <dt>Order ID</dt>
            <dd>{{ transaction.order.id }}</dd>

            <dt>Transaction ID</dt>
            <dd>{{ transaction.id }}</dd>

            <dt>Date Finalised</dt>
            <dd>{{ formatDate(transaction.completed_at) }}</dd>
          </dl>
        </div>
        <hr :class="['divider-primary', 'info-block__divider']">

        <customer-details
          :customer="transaction.order.customer"
        />

        <hr :class="['divider-primary', 'info-block__divider']">

        <div v-if="transaction.order">
          <subscription-details
            v-if="transaction.order.subscription"
            :subscription="subscription"
            is-transaction
          />

          <product-details
            v-if="transaction.order.single_product"
            :product="transaction.order.single_product"
          />

          <hr :class="['divider-primary', 'info-block__divider']">
        </div>

        <payment-details
          :customer="transaction.order.customer"
          :payment-source="transaction.funding_source"
          :token="transaction.token"
        />
      </div>
    </el-card>
  </main-layout>
</template>

<style lang="scss" module>
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
</style>
