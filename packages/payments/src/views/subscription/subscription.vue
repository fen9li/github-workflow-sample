<script>
import appConfig from '~/app.config'
import amountCharge from './information/modals/subscription-charge'
import subscriptionCancel from './information/modals/subscription-cancel'
import revertCancellation from './information/modals/revert-cancellation'
import isPast from '@lib/utils/date-is-past'
import get from 'lodash/get'
import formatDollar from '@lib/utils/format-dollar'

export default {
  name: 'Subscription',
  page: {
    title: 'Subscriptions',
    meta: [{ name: 'description', content: appConfig.description }],
  },
  components: {
    amountCharge,
    subscriptionCancel,
    revertCancellation,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      subscription: {},
      customer: {},
      modal: {
        charge: false,
        cancel: false,
        revert: false,
      },
      loading: false,
      shouldUpdate: false,
    }
  },
  computed: {
    tabKey() {
      return this.$route.name
    },
    tabs() {
      return [
        {
          label: 'Subscription Information',
          route: {
            name: 'subscription-information',
          },
        },
        {
          label: 'Transactions',
          route: {
            name: 'subscription-transactions',
          },
        },
      ]
    },
    amount() {
      const value = +get(this.subscription, 'outstanding.total')
      return {
        owing: value > 0,
        text: value >= 0 ? 'Amount Owing' :'Amount in Credit',
        value
      }
    }
  },
  created() {
    this.getData()
  },
  methods: {
    formatDollar,
    async getSubscription() {
      this.loading = true
      const [, response] = await this.$api.get(`/subscriptions/${this.id}`)
      if (response) {
        this.subscription = { ...response }
        if(response.cancellation_at && isPast(response.cancellation_at) ||
           response.end_at && isPast(response.end_at)) {
          this.subscription.isCancelled = true
        }
      }
      return response
    },
    async getCustomer(customerId) {
      const [, response] = await this.$api.get(`/customers/${customerId}`)
      if (response) {
        this.customer = { ...response, fullName: `${response.first_name} ${response.last_name}` }
        this.loading = false
      }
    },
    getData() {
      this.getSubscription().then(response => {
        if (response) {
          this.getCustomer(response.customer.id)
        }
      })
    }
  },
}
</script>

<template>
  <main-layout
    title="Subscription Details"
    back
    :tabs="tabs"
  >
    <div
      v-if="subscription.id"
      slot="header"
      v-loading="loading"
      :class="[
        $style.header,
        subscription.outstanding.total < 0 && $style.balanceNegative
      ]"
    >
      <div v-if="!loading">
        <div :class="$style.headerBtns">
          <div
            v-if="tabKey === 'subscription-transactions' && !subscription.isCancelled"
            :class="$style.cancellation"
          >
            <el-button
              v-if="!subscription.cancellation_at"
              type="primary"
              plain
              data-test="cancel"
              @click="modal.cancel = true"
            >
              Cancel Subscription
            </el-button>

            <el-button
              v-else
              plain
              type="primary"
              data-test="revert"
              @click="modal.revert = true"
            >
              Revert Cancellation
            </el-button>
          </div>

          <el-button
            v-if="amount.owing"
            type="primary"
            data-test="charge"
            @click="modal.charge = true"
          >
            Charge Amount Owing
          </el-button>
        </div>

        <subscription-cancel
          v-if="modal.cancel && tabKey === 'subscription-transactions'"
          :visible.sync="modal.cancel"
          :subscription="subscription"
          :payment-methods="customer.payment_sources"
          @updated="getData"
        />

        <revert-cancellation
          v-if="modal.revert"
          :visible.sync="modal.revert"
          :subscription="subscription"
          @updated="getData"
        />

        <amount-charge
          v-if="modal.charge"
          :visible.sync="modal.charge"
          :subscription="subscription"
          :customer="customer"
          :should-update.sync="shouldUpdate"
          @updated="getData"
        />

        <small
          :class="[$style.balanceLabel, {[$style.positiveOwing]: amount.owing}]"
        >
          {{ amount.text }}
          <b
            :class="$style.balanceCount"
          >
            {{ formatDollar(amount.value) }}
          </b>
        </small>
      </div>
    </div>

    <router-view
      :subscription="subscription"
      :customer="customer"
      :loading="loading"
      :should-update.sync="shouldUpdate"
      @updated="getData"
    />
  </main-layout>
</template>

<style lang="scss" module>

.header {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: -2.125rem;
  font-size: 1.1rem;
}

.balanceLabel {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 1.5rem;
}

.positiveOwing {
  color: var(--color-error);
}

.balanceCount {
  margin-left: .7rem;
  font-size: 1.2rem;
  font-weight: bold;
}

.headerBtns {
  display: flex;
}

.cancellation {
  padding-right: 1rem;
}
</style>
