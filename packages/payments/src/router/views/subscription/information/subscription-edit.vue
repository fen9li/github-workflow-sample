<script>
export default {
  name: 'SubscriptionEditModal',
  props: {
    subscription: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      dialogVisible: false,
      form: {
        subscriptionStart: 'now',
        endDate: null,
        subscriptionProduct: null,
        pricingPlan: 'monthly',
        coupon: null,
        paymentMethod: null,
      },
      rules: {},
    }
  },
  methods: {
    submit() {
      this.$notify({
        type: 'success',
        title: 'Success',
        message: 'Changes successfully saved',
      })
      this.$emit('update:visible', false)
    },
  },
}
</script>

<template>
  <div :class="$style.root">
    <el-dialog
      title="Edit Subscription"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <el-form
        :model="form"
        :rules="rules"
        class="card-form"
      >
        <el-form-item label="Customer name">
          <span :class="$style.customer">
            Mary Gregov
          </span>
        </el-form-item>
        <el-form-item label="Subscription Starts">
          <el-radio-group
            v-model="form.subscriptionStart"
            class="virtual-pos__form-charge"
            :disabled="true"
          >
            <el-radio label="now">
              Now
            </el-radio>
            <el-radio label="later">
              Later
            </el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="End Date">
          <el-date-picker
            v-model="form.endDate"
            type="date"
            placeholder="DD/MM/YY"
          />
        </el-form-item>

        <el-form-item
          label="Subcription Product"
          required
        >
          <el-select v-model="form.subscriptionProduct">
            <el-option
              value="1"
              label="Product 1"
            />
            <el-option
              value="2"
              label="Product 3"
            />
          </el-select>
        </el-form-item>

        <el-form-item
          label="Pricing plan"
          required
        >
          <el-select v-model="form.pricingplan">
            <el-option
              value="monthly"
              label="Monthly"
            />
            <el-option
              value="quraterly"
              label="Quarterrly"
            />
            <el-option
              value="yearly"
              label="Yearly"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="Coupon">
          <el-select
            v-model="form.coupon"
            placeholder="none"
          >
            <el-option
              value="1"
              label="Coupon 1"
            />
            <el-option
              value="2"
              label="Coupon 2"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="Payment method">
          <el-select
            v-model="form.paymentMethod"
            :disabled="true"
            placeholder="none"
          >
            <el-option
              value="1"
              label="Method 1"
            />
            <el-option
              value="2"
              label="Method 2"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <el-alert
        type="info"
        show-icon
        :closable="false"
      >
        Editing the Subscription Product or Pricing Plan
        may cause changes to payment dates, billing frequencies,
        and the subscription balance.
      </el-alert>
      <el-alert
        type="info"
        show-icon
        :closable="false"
      >
        Adding or editing a Coupon will become effective at the next
        billing date.
      </el-alert>

      <el-button
        type="primary"
        :class="$style.saveButton"
        @click="submit"
      >
        Save
      </el-button>
    </el-dialog>
  </div>
</template>

<style lang="scss" module>

.root {
  margin-left: 1rem;
}

.customer {
  font-size: 1rem;
}

.saveButton {
  display: block;
  width: 15rem;
  margin: 2rem auto 0;
}
</style>
