<script>
import paymentFormItem from '../payment-methods/payment-form-item'

export default {
  name: 'CustomerDetailsAddSubscription',
  components: {
    paymentFormItem,
  },
  data() {
    return {
      dialogVisible: false,
      showAddMethodForm: false,
      subscriptionForm: {
        customerName: 'Mary Gregov',
        startDate: '',
        endDate: '',
        subscriptionProduct: '',
        pricingPlan: '',
        coupon: '',
        selectedMethod: 1,
      },
      paymentMethods: [
        {
          value: 1,
          label: '**** 7493 MasterCard',
        },
        {
          value: 2,
          label: '**** 7493 ',
        },
      ],
      rules: {},
    }
  },
  computed: {
    displayMethodForm() {
      return this.paymentMethods.length === 0 || this.showAddMethodForm
    },
  },
  methods: {
    onSubmit() {
      this.showAddMethodForm = false
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$notify({
            type: 'success',
            title: 'Success',
            message: 'Subscription successfully added.',
          })
          this.$emit('update:visible', false)
        } else {
          return false
        }
      })
    },
  },
}
</script>

<template>
  <div>
    <el-dialog
      title="Add Subscription"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <el-form
        ref="form"
        label-position="top"
        :model="subscriptionForm"
        :rules="rules"
        :class="[$style.form]"
      >
        <el-form-item
          label="Customer"
        >
          <el-input
            v-model="subscriptionForm.customerName"
            :disabled="true"
          />
        </el-form-item>


        <el-col :span="11">
          <el-form-item
            label="Start Date"
            required
          >
            <el-date-picker
              v-model="subscriptionForm.startDate"
              type="date"
              placeholder="Enter Date"
            />
          </el-form-item>
        </el-col>
        <el-col
          class="line"
          :span="2"
        >
          &nbsp;
        </el-col>
        <el-col :span="11">
          <el-form-item
            label="End Date"
            required
          >
            <el-date-picker
              v-model="subscriptionForm.endDate"
              type="date"
              placeholder="Enter Date"
            />
          </el-form-item>
        </el-col>

        <el-form-item
          label="Subscription Product"
          prop="subscriptionProduct"
          required
        >
          <el-select
            v-model="subscriptionForm.subscriptionProduct"
            placeholder="Please select"
          >
            <el-option
              value="1"
              label="Subscription Product 1"
            />
            <el-option
              value="2"
              label="Subscription Product 2"
            />
          </el-select>
        </el-form-item>

        <el-form-item
          label="Pricing Plan"
          prop="pricingPlan"
          required
        >
          <el-select
            v-model="subscriptionForm.pricingPlan"
            placeholder="Please select"
          >
            <el-option
              value="1"
              label="Pricing Plan 1"
            />
            <el-option
              value="2"
              label="Pricing Plan 2"
            />
          </el-select>
        </el-form-item>

        <el-form-item
          label="Coupon"
          prop="coupon"
        >
          <el-select v-model="subscriptionForm.coupon">
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

        <hr :class="['divider-primary', $style.divider]">

        <payment-form-item
          :selected-method="subscriptionForm.selectedMethod"
          :payment-methods="paymentMethods"
          :display-form="displayMethodForm"
          @showForm="showAddMethodForm = $event"
          @changeMethod="subscriptionForm.selectedMethod = $event"
        />
      </el-form>
      <el-button
        v-if="!displayMethodForm"
        type="primary"
        :class="[$style.save, 'wide-button']"
        @click="onSubmit"
      >
        Save
      </el-button>
    </el-dialog>
  </div>
</template>

<style lang="scss" module>
.customerName {
  font-size: 1rem;
}

.save {
  display: block;
  margin: 0 auto;
}

.divider {
  margin: 2rem 0;
}
</style>
