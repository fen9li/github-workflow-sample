<script>
import appConfig from '~/app.config'
import CustomerDetails from './blocks/customer-details'
import PaymentDetails from './blocks/payment-details'
import SubscriptionDetails from './blocks/subscription-details'

export default {
  name: 'SubscriptionInformation',
  page: {
    title: 'Subscription Information',
    meta: [{ name: 'description', content: appConfig.description }],
  },
  components: {
    CustomerDetails,
    PaymentDetails,
    SubscriptionDetails,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
    subscription: {
      type: Object,
      default: () => {},
    },
    customer: {
      type: Object,
      default: () => {},
    },
    paymentMethods: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      modal: {
        edit: false,
        end: false,
        delete: false,
      },
    }
  },
}
</script>

<template>
  <el-card>
    <div
      v-if="subscription.id"
    >
      <subscription-details
        :subscription="subscription"
        :customer="customer"
        :payment-methods="paymentMethods"
      />
      <hr :class="['divider-primary', 'info-block__divider']">
      <customer-details
        :customer="customer"
      />
      <hr :class="['divider-primary', 'info-block__divider']">
      <payment-details
        :customer="customer"
      />
    </div>
  </el-card>
</template>
