<script>
import appConfig from '~/app.config'
import MockData from '@tests/__fixtures__/customer'

export default {
  name: 'CustomerProfile',
  page: {
    title: 'Customer Profile',
    meta: [{ name: 'description', content: appConfig.description }],
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      customerDetails: {
        address: '',
        created_at: '',
        email: '',
        enabled: '',
        first_name: '',
        id: '',
        last_name: '',
        mobile: '',
      },
    }
  },
  computed: {
    subscription() {
      return MockData.information
    },
    tabs() {
      return [
        {
          label: 'Information',
          route: {
            name: 'customer-information',
          },
        },
        {
          label: 'Transactions',
          route: {
            name: 'customer-transactions',
          },
        },
      ]
    },
  },
  created() {
    this.getInformation()
  },
  methods: {
    async getInformation() {
      const [, response] = await this.$api.get(`/customers/${this.id}`)

      this.customerDetails = { ...this.customerDetails, ...response }
    },
  },
}
</script>

<template>
  <main-layout
    title="Customer Details"
    :tabs="tabs"
    back
  >
    <div
      slot="header"
      :class="$style.balance"
    >
      <div :class="$style.owing">
        <big :class="$style.balanceCount">
          - {{ subscription.owing | dollar }}
        </big>
        <small :class="$style.balanceLabel">
          Subscriptions Owing
        </small>
      </div>
      <div :class="$style.total">
        <big :class="$style.balanceCount">
          {{ subscription.total | dollar }}
        </big>
        <small :class="$style.balanceLabel">
          Total Amount Transacted
        </small>
      </div>
    </div>
    <router-view :customer-details="customerDetails" />
  </main-layout>
</template>

<style lang="scss" module>


.balance {
  display: flex;
}

.total,
.owing {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 2rem;
  margin-left: 5rem;
  text-align: right;
}

.owing {
  color: var(--color-error);
}

.balanceCount {
  margin-bottom: .5rem;
  font-size: 1.5rem;
}
</style>
