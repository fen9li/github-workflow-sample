<script>
import appConfig from '~/app.config'
import amountCharge from './information/modals/subscription-charge'
import subscriptionCancel from './information/modals/subscription-cancel'
import revertCancellation from './information/modals/revert-cancellation'
import formatMethod from '@lib/utils/format-payment-method'
import isPast from '@lib/utils/date-is-past'

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
  },
  created() {
    this.getSubscription().then(response => {
      if (response) {
        this.getCustomer(response.customer.id)
      }
    })
  },
  methods: {
    async getSubscription() {
      this.loading = true
      const [, response] = await this.$api.get(`/subscriptions/${this.id}`)
      if (response) {
        this.subscription = { ...response }
        if(response.cancellation_at && isPast(response.cancellation_at)) {
          this.subscription.isCancelled = true
        }
      }
      return response
    },
    async getCustomer(customerId) {
      const [, response] = await this.$api.get(`/customers/${customerId}`)
      if (response) {
        this.customer = { ...response, fullName: `${response.first_name} ${response.last_name}` }
        this.adjustPaymentMethods()
        this.loading = false
      }
    },
    adjustPaymentMethods() {
      const { endpoints } = this.customer

      if (endpoints) {
        this.customer.paymentMethods = endpoints.map(item => {
          return { value: item.pan, label: formatMethod(item) }
        })
      }
    },
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
        <div
          v-if="!subscription.isCancelled"
          :class="$style.headerBtns"
        >
          <div
            v-if="tabKey === 'subscription-transactions'"
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
          :payment-methods="customer.paymentMethods"
        />

        <revert-cancellation
          v-if="modal.revert"
          :visible.sync="modal.revert"
          :subscription="subscription"
        />

        <amount-charge
          v-if="modal.charge"
          :visible.sync="modal.charge"
          :subscription="subscription"
          :customer="customer"
          :should-update.sync="shouldUpdate"
        />

        <small :class="$style.balanceLabel">
          Amount Owing
          <b :class="$style.balanceCount">{{ subscription.outstanding.total | dollar }}</b>
        </small>
      </div>
    </div>

    <router-view
      :subscription="subscription"
      :customer="customer"
      :loading="loading"
      :should-update.sync="shouldUpdate"
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
  color: var(--color-error);
}

.balanceLabel {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 1.5rem;
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
