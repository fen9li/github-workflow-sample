<script>
import paymentFormItem from '../payment-methods/payment-form-item'
import ElasticProcessor from '@lib/processors/elastic-processor'

export default {
  name: 'CustomerDetailsAddSubscription',
  components: {
    paymentFormItem,
  },
  props: {
    customer: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      showAddMethodForm: false,
      form: {
        start_at: '',
        end_at: '',
        product: '',
        frequency: '',
        coupon: '',
        selectedMethod: '',
      },
      productsData: {
        data: [],
        loading: true,
      },
      couponsData: {
        date: [],
        loading: true,
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
      rules: {
        start_at: [
          {
            required: true,
            message: 'This field is required',
            trigger: 'blur',
          },
        ],
        product: [
          {
            required: true,
            message: 'This field is required',
            trigger: 'blur',
          },
        ],
        frequency: [
          {
            required: true,
            message: 'This field is required',
            trigger: 'blur',
          },
        ],
      },
    }
  },
  computed: {
    displayMethodForm() {
      return this.customer.paymentMethods.length === 0 || this.showAddMethodForm
    },
    allProducts() {
      return this.productsData.data.map(product => {
        return { value: product.id, label: product.name }
      })
    },
    allCoupons() {
      return this.couponsData.data.map(coupon => {
        return { value: coupon.code, label: coupon.name }
      })
    },
  },
  created() {
    this.getProductsCoupons()
  },
  methods: {
    onSubmit() {
      this.showAddMethodForm = false
      this.$refs.form.validate(valid => {
        console.warn(this.form)

        // Add method here

        if (valid) {
          this.$notify({
            type: 'success',
            title: 'Success',
            message: 'Subscription successfully added.',
          })
          // this.$emit('update:visible', false)
        } else {
          return false
        }
      })
    },
    getProductsCoupons() {
      this.productsData = new ElasticProcessor({
        component: this,
        index: 'subscription-products',
      })
      this.couponsData = new ElasticProcessor({
        component: this,
        index: 'coupons',
      })
    },
  },
}
</script>

<template>
  <div>
    <el-dialog
      title="Add Subscription"
      :custom-class="$style.wrapper"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <el-form
        ref="form"
        label-position="top"
        :model="form"
        :rules="rules"
        :class="[$style.form]"
      >
        <el-form-item
          label="Customer"
        >
          <el-input
            :value="customer.fullName"
            disabled
          />
        </el-form-item>


        <el-col :span="11">
          <el-form-item
            label="Start Date"
            prop="start_at"
          >
            <el-date-picker
              v-model="form.start_at"
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
          >
            <el-date-picker
              v-model="form.end_at"
              type="date"
              placeholder="Enter Date"
            />
          </el-form-item>
        </el-col>

        <el-form-item
          label="Subscription Product"
          prop="product"
          required
        >
          <el-select
            v-model="form.product"
            v-loading="productsData.loading"
            placeholder="Please select"
          >
            <el-option
              v-for="product in allProducts"
              :key="product.value"
              :value="product.value"
              :label="product.label"
            />
          </el-select>
        </el-form-item>

        <el-form-item
          label="Frequency"
          prop="frequency"
          required
        >
          <el-select
            v-model="form.frequency"
            placeholder="Please select"
          >
            <el-option
              label="Monthly"
              value="P1M"
            />
            <el-option
              label="Yearly"
              value="P1Y"
            />
            <el-option
              label="Quarterly"
              value="P3M"
            />
          </el-select>
        </el-form-item>

        <el-form-item
          label="Coupon"
        >
          <el-select
            v-model="form.coupon"
            v-loading="couponsData.loading"
          >
            <el-option
              v-for="coupon in allCoupons"
              :key="coupon.id"
              :value="coupon.value"
              :label="coupon.label"
            />
          </el-select>
        </el-form-item>

        <hr :class="['divider-primary', $style.divider]">

        <payment-form-item
          :selected-method="form.selectedMethod"
          :payment-methods="customer.paymentMethods"
          :display-form="displayMethodForm"
          @showForm="showAddMethodForm = $event"
          @changeMethod="form.selectedMethod = $event"
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
.wrapper {
  width: 32rem;
}

.save {
  display: block;
  margin: 0 auto;
}

.divider {
  margin: 2rem 0;
}
</style>
