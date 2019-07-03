<script>
import { formatDate } from '@lib/utils/format-date'
import capitalize from 'lodash/capitalize'
import formatDollar from '@lib/utils/format-dollar'
import formatFrequency from '@lib/utils/format-frequency'
import anniversaryEdit from '../modals/anniversary-edit'
import couponsEdit from '../modals/coupons-edit'
import paymentEdit from '../modals/payment-edit'
import productEdit from '../modals/product-edit'
import subscriptionCancel from '../modals/subscription-cancel'

export default {
  name: 'SubscriptionDetails',
  components: {
    anniversaryEdit,
    couponsEdit,
    paymentEdit,
    productEdit,
    subscriptionCancel,
  },
  props: {
    subscription: {
      type: Object,
      default: () => {},
    },
    isTransaction: {
      type: Boolean,
      default: false,
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
        anniversary: false,
        coupon: false,
        payment: false,
        product: false,
        cancel: false,
      },
    }
  },
  computed: {
    product() {
      return this.subscription.current_product
    },
    appliedCoupon() {
      const { coupons } = this.subscription
      return coupons.length ? coupons[0].coupon : {}
    },

  },
  methods: {
    capitalize,
    formatDollar,
    formatFrequency,
    formatDate(value, format) {
      return formatDate(value, format || 'DD/MM/YYYY')
    },
  },
}
</script>

<template>
  <div
    class="info-block__wrapper"
  >
    <div class="info-block">
      <span class="info-block__title">
        Subscription Details
      </span>

      <dl
        v-if="subscription && product"
        :class="['datalist', 'info-block__flex-list']"
      >
        <dt>Start Date</dt>
        <dd>{{ `${formatDate(subscription.start_at)}` }}</dd>

        <dt>End Date</dt>
        <dd>{{ `${formatDate(subscription.end_at)}` }}</dd>

        <dt>Product Name</dt>
        <dd>{{ product.name }}</dd>

        <dt>Product Code</dt>
        <dd>{{ product.id }}</dd>

        <dt>Billing Cycle</dt>
        <dd>{{ capitalize(product.group.billing_type) }}</dd>

        <dt>Amount</dt>
        <dd>{{ `${formatDollar(subscription.pricingPlan)}` }}</dd>

        <dt>Frequency</dt>
        <dd>{{ formatFrequency(subscription.current_frequency.frequency) }}</dd>

        <dt>Next Billing Date</dt>
        <dd>{{ `${formatDate(subscription.next_billed_at)}` }}</dd>

        <dt>Coupon</dt>
        <dd>{{ appliedCoupon.name || '-' }}</dd>

        <dt>Valid Until</dt>
        <dd>{{ `${formatDate(appliedCoupon.end_at)}` }}</dd>
      </dl>

      <span
        v-else
        class="info-block__empty"
      >
        No information provided
      </span>
    </div>

    <div
      v-if="subscription.id"
      class="info-block__actions"
    >
      <el-button
        v-if="isTransaction"
        type="primary"
        @click="$router.push({name: 'subscription-details', params: {id: subscription.id}})"
      >
        View Subscription Details
      </el-button>
      <div
        v-else
        class="info-block__actions--subscription"
      >
        <el-button
          type="primary"
          @click="modal.anniversary = true"
        >
          Edit Anniversary Date
        </el-button>

        <el-button
          type="primary"
          @click="modal.coupon = true"
        >
          Add or Remove Coupon
        </el-button>

        <el-button
          type="primary"
          @click="modal.payment = true"
        >
          Change Payment Method
        </el-button>

        <el-button
          type="primary"
          @click="modal.product = true"
        >
          Change Subscription Product
        </el-button>

        <el-button
          type="danger"
          @click="modal.cancel = true"
        >
          Cancel Subscription
        </el-button>
      </div>

      <anniversary-edit
        v-if="modal.anniversary"
        :visible.sync="modal.anniversary"
        :subscription="subscription"
        :customer-name="customer.fullName"
      />
      <coupons-edit
        v-if="modal.coupon"
        :visible.sync="modal.coupon"
        :subscription="subscription"
        :customer-name="customer.fullName"
      />
      <payment-edit
        v-if="modal.payment"
        :visible.sync="modal.payment"
        :subscription="subscription"
        :customer="customer"
        :payment-methods="customer.paymentMethods"
      />
      <product-edit
        v-if="modal.product"
        :visible.sync="modal.product"
        :subscription="subscription"
        :customer-name="customer.fullName"
      />
      <subscription-cancel
        v-if="modal.cancel"
        :visible.sync="modal.cancel"
        :subscription="subscription"
        :payment-methods="customer.paymentMethods"
      />
    </div>
  </div>
</template>
