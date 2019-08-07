<script>
import ElasticProcessor from '@lib/processors/elastic-processor'
import { formatDate } from '@lib/utils/format-date'

export default {
  name: 'EditSubscriptionEditCouponsModal',
  props: {
    subscription: {
      type: Object,
      default: () => {},
    },
    customerName: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      processing: false,
      form: {
        coupons: [],
      },
      initialCoupon: null,
      couponsData: {
        data: [],
        loading: true,
      },
    }
  },
  computed: {
    allCoupons() {
      return this.couponsData.data.map(coupon => {
        return { value: coupon.code, label: coupon.name }
      })
    },
    appliedCoupon() {
      return this.subscription.coupons[0] || {}
    }
  },
  created() {
    this.getCoupons()
    const { coupons } = this.subscription
    if (coupons.length) {
      const applied = coupons[0].coupon.code
      this.initialCoupon = applied
      this.form.coupons.push(coupons[0].coupon.code)
    }
  },
  methods: {
    formatDate(value, format) {
      return formatDate(value, format || 'DD/MM/YYYY')
    },
    async onSubmit() {
      this.processing = true
      const { coupons } = this.form
      const { appliedCoupon } = this

      if (appliedCoupon.coupon) {
        if (!coupons.length) {
          this.removeCoupon().then(resp => {
            this.notify(resp)
            this.processing = false
          })
        } else {
          this.$emit('update:visible', false)
        }
      } else {
        if (coupons.length) {
          this.applyCoupon(coupons[0]).then(resp => {
            this.notify(resp)
            this.processing = false
          })
        }
      }
    },
    async applyCoupon(coupon) {
      return this.$api.put(`/subscriptions/${this.subscription.id}/coupons/${coupon}`, { data: {} })
    },
    getCoupons() {
      this.couponsData = new ElasticProcessor({
        component: this,
        index: 'coupons',
      })
    },
    async removeCoupon() {
      return this.$api.delete(`/subscriptions/${this.subscription.id}/coupons`, { data: {} })
    },
    notify(data) {
      const [error] = data
      if (error) {
        const violations = Object.keys(error.violations)
        violations.forEach(violation => {
          setTimeout(() => {
            this.$notify({
              type: 'error',
              title: 'Error',
              message: `${violation}: ${error.violations[violation][0]}`,
            })
          }, 50)
        })
      } else {
        this.$notify({
          type: 'success',
          title: 'Success',
          message: `Changes saved successfully`,
        })
        this.$emit('update:visible', false)
        this.$emit('updated')
      }
    },
    disableCoupon(coupon) {
      const { appliedCoupon } = this
      return appliedCoupon.coupon && appliedCoupon.coupon.code !== coupon.value
    }
  },
}
</script>

<template>
  <el-dialog
    title="Add or Remove Coupon"
    :custom-class="$style.wrapper"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <el-form
      ref="form"
      :model="form"
      class="modal-form"
      label-width="200px"
      label-position="top"
    >
      <el-form-item
        label="Customer"
      >
        <el-input
          :value="customerName"
          disabled
          data-test="customer"
        />
      </el-form-item>
      <el-form-item
        label="Coupon"
      >
        <el-select
          v-model="form.coupons"
          v-loading="couponsData.loading"
          multiple
          :multiple-limit="1"
          placeholder="Select"
          data-test="coupons"
          :disabled="!!appliedCoupon.end_at"
        >
          <el-option
            v-for="item in allCoupons"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            :disabled="disableCoupon(item)"
          />
        </el-select>
      </el-form-item>
      <div
        v-if="appliedCoupon.end_at && !couponsData.loading"
        :class="$style.removeNote"
      >
        This coupon will be removed at the end of the current billing cycle schedule on {{ formatDate(appliedCoupon.end_at) }}
      </div>
    </el-form>
    <div class="modal-note">
      <i class="el-icon-info" />
      <div class="modal-note__text">
        Adding of editing a Coupon will become effective at the text billing date.
      </div>
    </div>
    <div class="modal__footer">
      <el-button
        type="primary"
        :class="$style.save"
        data-test="submit"
        :loading="processing"
        @click="onSubmit"
      >
        Save
      </el-button>
    </div>
  </el-dialog>
</template>

<style lang="scss" module>
.wrapper {
  width: 32rem;
}

.save {
  width: 15rem !important;
}

.removeNote {
  padding-bottom: 1.2rem;
  color: var(--color-error);
  word-break: normal !important;
}
</style>
