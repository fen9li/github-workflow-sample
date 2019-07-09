<script>
import appConfig from '~/app.config'
import amountCharge from './information/modals/subscription-charge'
import subscriptionCancel from './information/modals/subscription-cancel'
import formatMethod from '@lib/utils/format-payment-method'

export default {
  name: 'Subscription',
  page: {
    title: 'Subscriptions',
    meta: [{ name: 'description', content: appConfig.description }],
  },
  components: {
    amountCharge,
    subscriptionCancel,
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
      },
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
      const [error, response] = await this.$api.get(`/subscriptions/${this.id}`)
      if (response) {
        this.subscription = { ...response }
      }
      console.warn(error, response)

      return response
    },
    async getCustomer(customerId) {
      this.loading = true
      const [, response] = await this.$api.get(`/customers/${customerId}`)
      if (response) {
        this.customer = { ...response, fullName: `${response.first_name} ${response.last_name}` }
        this.adjustPaymentMethods()
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
      :class="[
        $style.header,
        subscription.outstanding.total < 0 && $style.balanceNegative
      ]"
    >
      <div :class="$style.headerBtns">
        <el-button
          v-if="tabKey === 'subscription-transactions'"
          type="primary"
          plain
          @click="modal.cancel = true"
        >
          Cancel Subscription
        </el-button>
        <el-button
          type="primary"
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

      <amount-charge
        v-if="modal.charge"
        :visible.sync="modal.charge"
        :subscription="subscription"
        :customer-name="customer.fullName"
        :payment-methods="customer.paymentMethods"
      />

      <small :class="$style.balanceLabel">
        Amount Owing
        <b :class="$style.balanceCount">{{ subscription.outstanding.total | dollar }}</b>
      </small>
    </div>

    <router-view
      :subscription="subscription"
      :customer="customer"
    />
  </main-layout>
</template>

<style lang="scss" module>

.header {
  display: flex;
  flex-direction: column;
  justify-content: center;
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
</style>
