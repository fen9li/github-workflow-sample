<script>
import CouponFormModal from './coupon-form-modal'
import CouponDelete from './coupon-delete'
import { formatDate } from '@lib/utils/format-date'
import formatDollar from '@lib/utils/format-dollar'

export default {
  name: 'Coupon',
  components: {
    CouponFormModal,
    CouponDelete,
  },
  props: {
    id: {
      type: [String, Number],
      required: true,
    },
  },
  page: {
    title: 'Coupon',
  },
  data() {
    return {
      modal: {
        edit: false,
        delete: false,
      },
      loading: false,
      coupon: {
        created_at: null,
        name: null,
        code: null,
        start_at: null,
        end_at: null,
        fixed_amount: {},
        validity_period: null,
        useCount: 0,
      },
    }
  },
  computed: {
    formattedCoupon() {
      const { coupon, discount, extractValidity } = this
      return { ...coupon, ...{ discount_type: discount.type.raw, amount: discount.amount.raw }, validity_period: extractValidity() }
    },
    discount() {
      const { coupon } = this
      return {
        type: {
          raw: coupon.percentage ? 'percentage': 'fixed_amount',
          formatted: coupon.percentage ? 'Percentage' : 'Fixed Amount',
        },
        amount: {
          raw: coupon.percentage || coupon.fixed_amount.total,
          formatted: coupon.percentage ? `${coupon.percentage}%` : `${formatDollar(coupon.fixed_amount.total)} ${coupon.fixed_amount.currency}`,
        },
      }
    },

  },
  created() {
    this.getCouponDetails()
  },
  methods: {
    async getCouponDetails() {
      this.loading = true
      const [, response] = await this.$api.get(`/coupons/${this.id}`)

      this.loading = false

      if (response) {
        this.coupon = { ...this.coupon, ...response }
      }
    },
    formatDate(value, format) {
      return formatDate(value, format)
    },
    extractValidity(months = false) {
      const period = this.coupon.validity_period

      if(period) {
        const formatted = parseInt(period.replace(/[^\d]/g, ''))
        return months ? `${formatted} Months` : formatted
      } else return ''
    },
    formatDollar,
  },

}
</script>

<template>
  <main-layout
    title="Coupon Details"
    back
  >
    <el-card v-loading="loading">
      <div
        slot="header"
        :class="$style.header"
      >
        <span>Information</span>

        <div
          v-if="!loading"
        >
          <el-button
            type="primary"
            icon="el-icon-edit"
            circle
            data-test="edit"
            @click="modal.edit = true"
          />
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            data-test="delete"
            @click="modal.delete = true"
          />
        </div>
      </div>

      <dl
        v-if="!loading"
        class="datalist"
      >
        <dt>Date Created</dt>
        <dd>{{ formatDate(coupon.created_at, 'DD/MM/YYYY hh:mm') }}</dd>

        <dt>Coupon Name</dt>
        <dd>{{ coupon.name }}</dd>

        <dt>Coupon Code</dt>
        <dd>{{ coupon.code }}</dd>

        <dt>Discount Type</dt>
        <dd data-test="type">
          {{ discount.type.formatted }}
        </dd>

        <dt>Amount</dt>
        <dd data-test="amount">
          {{ discount.amount.formatted }}
        </dd>

        <dt>Effective Start Date</dt>
        <dd>{{ formatDate(coupon.start_at, 'DD/MM/YYYY') }}</dd>

        <dt>End Date</dt>
        <dd>{{ formatDate(coupon.end_at, 'DD/MM/YYYY') }}</dd>

        <dt>Validity Period</dt>
        <dd data-test="validity">
          {{ `${extractValidity('months')}` || '-' }}
        </dd>

        <dt>No. in use</dt>
        <dd>{{ coupon.useCount }}</dd>
      </dl>
    </el-card>

    <coupon-form-modal
      v-if="modal.edit"
      :visible.sync="modal.edit"
      :coupon="formattedCoupon"
      edit
      @updated="getCouponDetails"
    />
    <coupon-delete
      v-if="modal.delete"
      :id="coupon.id"
      :visible.sync="modal.delete"
    />
  </main-layout>
</template>

<style lang="scss" module>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
