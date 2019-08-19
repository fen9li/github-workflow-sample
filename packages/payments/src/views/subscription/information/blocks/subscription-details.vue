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
import revertCancellation from '../modals/revert-cancellation'

export default {
  name: 'SubscriptionDetails',
  components: {
    anniversaryEdit,
    couponsEdit,
    paymentEdit,
    productEdit,
    subscriptionCancel,
    revertCancellation,
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
  },
  data() {
    return {
      modal: {
        anniversary: false,
        coupon: false,
        payment: false,
        product: false,
        cancel: false,
        revert: false,
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
    showBtns() {
      const { subscription, isTransaction } = this
      return subscription.id && (isTransaction || !subscription.isCancelled)
    },
    showAmountNote() {
      const { next_billed_amount: amount, isCancelled } = this.subscription
      return amount && !isCancelled
    }
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
        {{ isTransaction ? 'Subscription Details' : 'General Information' }}
      </span>

      <dl
        v-if="subscription"
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
        <dd>{{ `${formatDollar(subscription.next_billed_amount.total)}` }}</dd>

        <dt>Frequency</dt>
        <dd>{{ formatFrequency(subscription.current_frequency.frequency) }}</dd>

        <dt>Next Billing Date</dt>
        <dd>{{ `${formatDate(subscription.next_billed_at)}` }}</dd>

        <dt>Coupon</dt>
        <dd>{{ appliedCoupon.name || '-' }}</dd>

        <dt>Coupon Valid Until</dt>
        <dd>{{ `${formatDate(appliedCoupon.end_at)}` }}</dd>
      </dl>

      <div
        v-if="showAmountNote"
        :class="['modal-note', $style.note]"
      >
        <i class="el-icon-info" />
        <div class="modal-note__text">
          Amount may change
        </div>
      </div>

      <span
        v-if="!subscription.id"
        class="info-block__empty"
      >
        No information provided
      </span>
    </div>

    <div>
      <div
        v-if="showBtns"
        class="info-block__actions"
      >
        <el-button
          v-if="isTransaction"
          type="primary"
          data-test="details"
          @click="$router.push({name: 'subscription-details', params: {id: subscription.id}})"
        >
          View Subscription Information
        </el-button>
        <div
          v-else
          class="info-block__actions--subscription"
        >
          <el-button
            v-if="product.group.billing_type === 'anniversary'"
            type="primary"
            data-test="anniversary"
            @click="modal.anniversary = true"
          >
            Edit Anniversary Date
          </el-button>

          <el-button
            type="primary"
            data-test="coupon"
            @click="modal.coupon = true"
          >
            Add or Remove Coupon
          </el-button>

          <el-button
            type="primary"
            data-test="payment"
            @click="modal.payment = true"
          >
            Change Payment Method
          </el-button>

          <el-button
            v-if="product.group.billing_type === 'prorata'"
            type="primary"
            data-test="product"
            @click="modal.product = true"
          >
            Change Subscription Product
          </el-button>

          <el-button
            v-if="!subscription.cancellation_at"
            type="danger"
            data-test="cancel"
            @click="modal.cancel = true"
          >
            Cancel Subscription
          </el-button>

          <el-button
            v-else
            type="danger"
            data-test="revert"
            @click="modal.revert = true"
          >
            Revert Cancellation
          </el-button>
        </div>

        <anniversary-edit
          v-if="modal.anniversary"
          :visible.sync="modal.anniversary"
          :subscription="subscription"
          :customer-name="customer.fullName"
          @updated="$emit('updated')"
        />
        <coupons-edit
          v-if="modal.coupon"
          :visible.sync="modal.coupon"
          :subscription="subscription"
          :customer-name="customer.fullName"
          @updated="$emit('updated')"
        />
        <payment-edit
          v-if="modal.payment"
          :visible.sync="modal.payment"
          :customer="customer"
          :subscription="subscription"
          @updated="$emit('updated')"
        />
        <product-edit
          v-if="modal.product"
          :visible.sync="modal.product"
          :subscription="subscription"
          :customer-name="customer.fullName"
          @updated="$emit('updated')"
        />
        <subscription-cancel
          v-if="modal.cancel"
          :visible.sync="modal.cancel"
          :subscription="subscription"
          :payment-methods="customer.payment_sources"
          @updated="$emit('updated')"
        />

        <revert-cancellation
          v-if="modal.revert"
          :visible.sync="modal.revert"
          :subscription="subscription"
          @updated="$emit('updated')"
        />
      </div>
      <span
        v-if="subscription.cancellation_at && !subscription.isCancelled"
        :class="$style.cancellation"
      >
        {{ `Cancellation date is ${formatDate(subscription.cancellation_at)}` }}
      </span>

      <span
        v-if="subscription.isCancelled"
        :class="$style.cancellation"
      >
        Subscription is cancelled
      </span>
    </div>
  </div>
</template>

<style lang="scss" module>
.cancellation {
  display: inline-block;
  min-width: 14rem;
  padding-top: 1.5rem;
  color: var(--color-error);
}

.note {
  width: 10rem;
  margin-top: 1rem;
  font-size: rem(13px);
}
</style>
