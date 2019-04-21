<script>
import appConfig from '@src/app.config'
import MockData from '@mock-api/resources/customer'
import Information from './information/customer-information'
import Subscriptions from './subscriptions/customer-subscriptions'
import Products from './products/customer-products'
import PaymentMethods from './payment-methods/customer-methods'

export default {
  name: 'CustomerInformation',
  page: {
    title: 'Customer Information',
    meta: [{ name: 'description', content: appConfig.description }],
  },
  components: {
    Information,
    Subscriptions,
    Products,
    PaymentMethods,
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
        edit: false,
        delete: false,
      },
    }
  },
  computed: {
    customer() {
      return MockData.information
    },
  },
}
</script>

<template>
  <div :class="$style.root">
    <el-card class="card-no-padding">
      <information
        class="card-inline"
        :customer="customer"
      />

      <hr :class="['divider-primary', $style.divider]">

      <payment-methods
        class="card-inline"
        :customer="customer"
      />
    </el-card>

    <subscriptions
      :class="$style.subscriptions"
      :customer="customer"
    />

    <products :customer="customer" />
  </div>
</template>

<style lang="scss" module>


.subscriptions {
  margin: 1rem 0;
}

.divider {
  margin: 0 var(--size-card-spacing);
}
</style>
