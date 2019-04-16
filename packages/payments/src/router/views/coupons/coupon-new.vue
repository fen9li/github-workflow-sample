<script>
import appConfig from '@src/app.config'
import MainLayout from '@layouts/main/main-layout.vue'

export default {
  name: 'CouponNew',
  page: {
    title: 'Coupons',
    meta: [{ name: 'description', content: appConfig.description }],
  },
  components: {
    MainLayout,
  },
  data() {
    return {
      form: {
        couponName: '',
        couponID: 'F001',
        type: 'percentage',
        perOff: '0',
        duration: 'Forever',
        redemptionLim: true,
        numberLim: true,
      },
      durationOptions: [
        {
          value: 'Forever',
          label: 'Forever',
        },
        {
          value: 'Month',
          label: 'Month',
        },
        {
          value: 'Week',
          label: 'Week',
        },
        {
          value: 'Day',
          label: 'Day',
        },
      ],
    }
  },
  methods: {
    onSubmit() {
      // console.log('submit');
    },
  },
}
</script>

<template>
  <main-layout>
    <h4>Tell us about this coupon</h4>
    <el-form
      ref="form"
      :model="form"
    >
      <el-row type="flex">
        <el-col :span="9">
          <el-form-item label="Coupon Name*">
            <el-input
              v-model="form.couponName"
              placeholder="First purchase..."
            />
          </el-form-item>
        </el-col>
      </el-row>
      <p>This will appear on customers' receipts and invoices.</p>
      <el-row type="flex">
        <el-col :span="9">
          <el-form-item label="Coupon ID*">
            <el-input v-model="form.couponID" />
          </el-form-item>
        </el-col>
      </el-row>
      <p>
        This will identify this coupon in the API. We recommend leaving this
        blank so we can generate an ID for you.
      </p>
      <h4>Type</h4>
      <el-row
        type="flex"
        class="coupon__type"
      >
        <el-col :span="9">
          <el-radio
            v-model="form.type"
            label="percentage"
          >
            Percentage discount
          </el-radio>
        </el-col>
      </el-row>
      <el-row
        type="flex"
        class="coupon__type"
      >
        <el-col :span="9">
          <el-radio
            v-model="form.type"
            label="fixed"
          >
            Fixed amount discount
          </el-radio>
        </el-col>
      </el-row>
      <el-row
        type="flex"
        class="coupon__type-details"
      >
        <el-col :span="4">
          <el-form-item label="Percentage off*">
            <el-input v-model="form.perOff">
              <template
                #suffix
              >
                %
              </template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col
          :span="4"
          :offset="1"
        >
          <el-form-item label="Duration*">
            <el-select v-model="form.duration">
              <el-option
                v-for="item in durationOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <p>
        The duration determines how long this coupon will apply once redeemed
        on a subscription or customer.
      </p>
      <h4>Redemption limits</h4>
      <el-row
        type="flex"
        class="coupon__check"
      >
        <el-col :span="9">
          <el-checkbox
            :key="form.redemptionLim"
            v-model="form.redemptionLim"
            :label="form.redemptionLim"
          >
            Limit the date range when customers can redeem this coupon
          </el-checkbox>
        </el-col>
      </el-row>
      <el-row
        type="flex"
        class="coupon__check"
      >
        <el-col :span="9">
          <el-checkbox
            :key="form.numberLim"
            v-model="form.numberLim"
            :label="form.numberLim"
          >
            Limit the total number of times this coupon can be redeemed
          </el-checkbox>
        </el-col>
      </el-row>
      <el-row type="flex">
        <el-col
          :span="6"
          :offset="17"
        >
          <el-form-item>
            <el-button
              type="primary"
              @click="onSubmit"
            >
              Create coupon
            </el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </main-layout>
</template>

<style lang="scss">
@import '@design';

.coupon {
  &__type {
    margin-bottom: 15px;

    &-details {
      margin-top: 20px;
    }
  }

  &__check {
    margin: 15px 0;
  }
}
</style>
