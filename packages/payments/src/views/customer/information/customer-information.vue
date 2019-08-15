<script>
import appConfig from '~/app.config'
import CustomerDetails from './customer-details'
import PaymentMethods from '../payment-methods/customer-methods'

export default {
  name: 'CustomerInformation',
  page: {
    title: 'Customer Information',
    meta: [{ name: 'description', content: appConfig.description }],
  },
  components: {
    CustomerDetails,
    PaymentMethods,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
    customer: {
      type: Object,
      required: true,
    },
    loading: {
      type: Boolean,
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
}
</script>

<template>
  <div :class="$style.root">
    <el-card v-loading="loading">
      <customer-details
        :customer="customer"
        :loading="loading"
      />

      <hr :class="['divider-primary', $style.divider]">

      <payment-methods
        :customer="customer"
        :loading="loading"
        @updated="$emit('updated')"
      />
    </el-card>
  </div>
</template>

<style lang="scss" module>
.subscriptions {
  margin: 1rem 0;
}

.divider {
  margin: var(--size-card-spacing) 0;
}
</style>
