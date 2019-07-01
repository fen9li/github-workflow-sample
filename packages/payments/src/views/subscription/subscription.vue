<script>
import appConfig from '~/app.config'
import amountCharge from './information/modals/subscription-charge'
import formatMethod from '@lib/utils/format-payment-method'

export default {
  name: 'SubscriptionsDetails',
  page: {
    title: 'Subscriptions',
    meta: [{ name: 'description', content: appConfig.description }],
  },
  components: {
    amountCharge,
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
      },
    }
  },
  computed: {
    tabKey() {
      return this.$route.name
    },
    paymentMethods() {
      const { endpoints } = this.customer

      if (endpoints) {
        return endpoints.map(item => {
          return { value: item.pan, label: formatMethod(item) }
        })
      } else {
        return []
      }
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
      }
    },
  },
}
</script>

<template>
  <main-layout
    title="Subscriptions"
    back
  >
    <div
      v-if="subscription.id"
      slot="header"
      :class="[
        $style.balance,
        subscription.outstanding.total < 0 && $style.balanceNegative
      ]"
    >
      <el-button
        type="primary"
        @click="modal.charge = true"
      >
        Charge Amount Owing
      </el-button>

      <amount-charge
        v-if="modal.charge"
        :visible.sync="modal.charge"
        :subscription="subscription"
        :customer-name="customer.fullName"
        :payment-methods="paymentMethods"
      />

      <small :class="$style.balanceLabel">
        Amount Owing
        <b :class="$style.balanceCount">{{ subscription.outstanding.total | dollar }}</b>
      </small>
    </div>
    <el-tabs
      slot="subheader"
      :class="$style.tabs"
      :value="tabKey"
    >
      <el-tab-pane
        v-for="tab in tabs"
        :key="tab.route.name"
        :name="tab.route.name"
      >
        <router-link
          slot="label"
          :class="$style.tab"
          :to="tab.route"
        >
          {{ tab.label }}
        </router-link>
      </el-tab-pane>
    </el-tabs>

    <router-view
      :subscription="subscription"
      :customer="customer"
      :payment-methods="paymentMethods"
    />
  </main-layout>
</template>

<style lang="scss" module>
.tabs {
  margin-bottom: 1.5rem;
}

.tab {
  display: block;
  height: 100%;
  color: inherit !important;
  text-decoration: none;
}

.balance {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 2rem;
  font-size: 1.1rem;
  color: var(--color-error);
}

.balanceLabel {
  display: flex;
  align-items: center;
  margin-top: 1.5rem;
}

.balanceCount {
  margin-left: .7rem;
  font-size: 1.2rem;
  font-weight: bold;
}
</style>
