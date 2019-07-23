<script>
import appConfig from '~/app.config'
import AddProduct from './product-add'
import AddSubscription from './subscriptions/customer-subscription-add'
import formatMethod from '@lib/utils/format-payment-method'

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
      modal: {
        addSubscription: false,
        addProduct: false,
      },
      customer: {},
      loading: false,
    }
  },
  computed: {
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
      return !this.loading ? `${this.customer.first_name || ''} ${this.customer.last_name || ''}` : ''
    },
    subtitle() {
      return !this.loading ? 'Customer ID ' + this.customer.id : ''
    },
  },
  created() {
    this.getInformation().then(() => {
      this.adjustPaymentMethods()
    })
  },
  methods: {
    async getInformation() {
      this.loading = true
      const [, response] = await this.$api.get(`/customers/${this.id}`)

      this.customer = { ...response, fullName: `${response.first_name} ${response.last_name} ` }
      this.loading = false
      return response
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
    :title="title"
    :subtitle="subtitle"
    :tabs="tabs"
    back
  >
    <div
      slot="header"
      v-loading="loading"
      :class="$style.top"
    >
      <div :class="$style.buttons">
        <el-button
          type="primary"
          class="wide-button"
          data-test="add-subscription"
          @click="modal.addSubscription = true"
        >
          Add Subscription
        </el-button>
        <el-button
          type="primary"
          plain
          class="wide-button"
          data-test="add-product"
          @click="modal.addProduct = true"
        >
          Add Product
        </el-button>
      </div>
      <div :class="$style.balance">
        <div :class="$style.owing">
          <small :class="$style.balanceLabel">
            Amount Owing
          </small>
          <strong
            v-if="!loading"
            :class="$style.balanceCount"
            data-test="owing"
          >
            {{ customer.total_amount_outstanding | dollar }}
          </strong>
        </div>
        <div :class="$style.total">
          <small :class="$style.balanceLabel">
            Total Amount Transacted
          </small>
          <strong
            v-if="!loading"
            :class="$style.balanceCount"
            data-test="transacted"
          >
            {{ customer.total_amount_transacted | dollar }}
          </strong>
        </div>
      </div>
    </div>

    <router-view
      :customer="customer"
      :loading="loading"
    />

    <add-product
      v-if="modal.addProduct"
      :visible.sync="modal.addProduct"
      :customer="customer"
    />

    <add-subscription
      v-if="modal.addSubscription"
      :visible.sync="modal.addSubscription"
      :customer="customer"
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
