<script>
import CouponFormModal from './coupon-form-modal'
import DeleteModal from './coupon-delete'
import { formatDate } from '@lib/utils/format-date'
import formatDollar from '@lib/utils/format-dollar'

export default {
  name: 'Coupon',
  components: {
    CouponFormModal,
    DeleteModal,
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
        created_at: '',
        name: '',
        code: '',
        start_at: '',
        end_at: '',
        fixed_amount: {},
        validity_period: '',
        useCount: 0,
      },
    }
  },
  computed: {
    formattedCoupon() {
      const { coupon, discount } = this
      return { ...coupon, ...{ discount_type: discount.type.raw, amount: discount.amount.raw } }
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
      const [error, response] = await this.$api.get(`/coupons/${this.id}`)
      if (response) {
        this.coupon = { ...this.coupon, ...response }
        this.loading = false
      }
      console.warn(error, response)
    },
    formatDate(value, format) {
      return formatDate(value, format)
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
    <el-card v-if="coupon.id && !loading">
      <el-row
        slot="header"
        type="flex"
        justify="space-between"
        align="middle"
      >
        <span>Information</span>

        <el-row type="flex">
          <el-button
            type="primary"
            size="small"
            icon="el-icon-edit"
            circle
            @click="modal.edit = true"
          />
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="small"
            circle
            @click="modal.delete = true"
          />
        </el-row>
      </el-row>

      <dl class="datalist">
        <dt>Date Created</dt>
        <dd>{{ formatDate(coupon.created_at, 'DD/MM/YYYY hh:mm') }}</dd>

        <dt>Coupon Name</dt>
        <dd>{{ coupon.name }}</dd>

        <dt>Coupon Code</dt>
        <dd>{{ coupon.code }}</dd>

        <dt>Discount Type</dt>
        <dd>{{ discount.type.formatted }}</dd>

        <dt>Amount</dt>
        <dd>{{ discount.amount.formatted }}</dd>

        <dt>Effective Start Date</dt>
        <dd>{{ formatDate(coupon.start_at, 'DD/MM/YYYY') }}</dd>

        <dt>End Date</dt>
        <dd>{{ formatDate(coupon.end_at, 'DD/MM/YYYY') }}</dd>

        <dt>Validity Period</dt>
        <dd>{{ coupon.validity_period }}</dd>

        <dt>No. in use</dt>
        <dd>{{ coupon.useCount }}</dd>
      </dl>
    </el-card>

    <div v-else>
      Coupon not found
    </div>


    <coupon-form-modal
      v-if="modal.edit"
      :visible.sync="modal.edit"
      :coupon="formattedCoupon"
      edit
      @updated="getCouponDetails"
    />
    <delete-modal
      v-if="modal.delete"
      :id="coupon.id"
      :visible.sync="modal.delete"
    />
  </main-layout>
</template>
