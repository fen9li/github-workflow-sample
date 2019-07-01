<script>
import appConfig from '~/app.config'
import MockData from '@tests/__fixtures__/customer'
import Information from './information/customer-information'
import PaymentMethods from './payment-methods/customer-methods'

export default {
  name: 'CustomerInformation',
  page: {
    title: 'Customer Information',
    meta: [{ name: 'description', content: appConfig.description }],
  },
  components: {
    Information,
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
  computed: {
    customerMock() {
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
        :loading="loading"
      />

      <hr :class="['divider-primary', $style.divider]">

      <!-- TODO: Replace with real data-->
      <payment-methods
        class="card-inline"
        :customer="customer"
        :loading="loading"
      />
    </el-card>
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
