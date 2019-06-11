<script>
import appConfig from '~/app.config'
import MockData from '@tests/__fixtures__/customer'
import AddProduct from './products/product-add'
import AddSubscription from './subscriptions/subscription-add'

export default {
  name: 'CustomerProfile',
  page: {
    title: 'Customer Profile',
    meta: [{ name: 'description', content: appConfig.description }],
  },
  components: {
    AddProduct,
    AddSubscription,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      modals: {
        addSubscription: false,
        addProduct: false,
      },
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
          label: 'Subscriptions',
          route: {
            name: 'customer-subscriptions',
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
    title() {
      return this.customerDetails.first_name + ' ' + this.customerDetails.last_name
    },
    subtitle() {
      return 'Customer ID ' + this.customerDetails.id
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
    :title="title"
    :subtitle="subtitle"
    :tabs="tabs"
    back
  >
    <div
      slot="header"
      :class="$style.top"
    >
      <div :class="$style.buttons">
        <el-button
          type="primary"
          class="wide-button"
          @click="modals.addSubscription = true"
        >
          Add Subscription
        </el-button>
        <el-button
          type="primary"
          plain
          class="wide-button"
          @click="modals.addProduct = true"
        >
          Add Product
        </el-button>
      </div>
      <div :class="$style.balance">
        <div :class="$style.owing">
          <small :class="$style.balanceLabel">
            Amount Owing
          </small>
          <strong :class="$style.balanceCount">
            {{ subscription.owing | dollar }}
          </strong>
        </div>
        <div :class="$style.total">
          <small :class="$style.balanceLabel">
            Total Amount Transacted
          </small>
          <strong :class="$style.balanceCount">
            {{ subscription.total | dollar }}
          </strong>
        </div>
      </div>
    </div>

    <router-view :customer-details="customerDetails" />

    <add-product
      v-if="modals.addProduct"
      :visible.sync="modals.addProduct"
    />

    <add-subscription
      v-if="modals.addSubscription"
      :visible.sync="modals.addSubscription"
    />
  </main-layout>
</template>

<style lang="scss" module>
.balance {
  display: flex;
  margin-top: 0.75rem;
}

.top {
  margin-bottom: -2.125rem;
}

.buttons {
  display: flex;
  justify-content: flex-end;

  :global {
    .el-button {
      padding-top: 10px;
      padding-bottom: 10px;
    }
  }
}

.total,
.owing {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 2rem;
  text-align: right;
}

.owing {
  color: var(--color-error);
}

.balanceCount {
  margin-left: 0.75rem;
  font-size: 1.125rem;
}
</style>
