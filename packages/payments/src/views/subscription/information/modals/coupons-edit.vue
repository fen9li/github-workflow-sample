<script>
import ElasticProcessor from '@lib/processors/elastic-processor'

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
      form: {
        coupons: [],
      },
      initialCoupon: '',
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
  },
  created() {
    this.getCoupons()
    const { coupons } = this.subscription
    if (coupons.length) {
      const applied = coupons[0].coupon.code
      this.initialCoupon = applied
      this.form.coupons.push(applied)
    }
  },
  methods: {
    async onSubmit() {
      const { coupons } = this.form
      const { initialCoupon } = this

      // TODO: New coupon
      if (coupons.length && initialCoupon !== coupons[0]) {
        // First we delete old coupon, then apply new
        this.removeCoupon().then(() => {
          this.applyCoupon(coupons[0]).then(resp => {
            this.notify(resp)
          })
        })
      } else if (initialCoupon && !coupons.length) {
        this.removeCoupon().then(resp => {
          this.notify(resp)
        })
      } else {
        this.$emit('update:visible', false)
      }
    },
    async applyCoupon(coupon) {
      return await this.$api.put(`/subscriptions/${this.subscription.id}/coupons/${coupon}`)
    },
    getCoupons() {
      this.couponsData = new ElasticProcessor({
        component: this,
        index: 'coupons',
      })
    },
    async removeCoupon() {
      return await this.$api.delete(`/subscriptions/${this.subscription.id}/coupons/`)
    },
    notify(data) {
      const [error] = data
      if (error) {
        const firstError = error.violations[Object.keys(error.violations)[0]][0]
        this.$notify({
          type: 'error',
          title: 'Error',
          message: firstError,
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
        >
          <el-option
            v-for="item in allCoupons"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
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
</style>
