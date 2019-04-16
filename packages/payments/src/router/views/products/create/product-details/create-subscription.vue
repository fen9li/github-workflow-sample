<script>
import anchorDates from './product-anchor-dates'
import { mask } from 'vue-the-mask'

export default {
  name: 'CreateSubscriptionProductForm',
  directives: {
    mask,
  },
  components: {
    anchorDates,
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      rules: {
        productName: [
          {
            required: true,
            message: 'This field is required',
            trigger: 'blur',
          },
        ],
        effectiveStartDate: [
          {
            required: true,
            message: 'This field is required',
            trigger: 'blur',
          },
        ],
        billingCycle: [
          {
            required: true,
            message: 'This field is required',
            trigger: 'blur',
          },
        ],
        anchorDate: [
          {
            required: true,
            message: 'This field is required',
            trigger: 'blur',
          },
        ],
      },
    }
  },
  methods: {
    changeValue(fieldName, newVal) {
      this.$emit('changeValue', { fieldName, newVal })
    },
  },
}
</script>

<template>
  <div :class="$style.root">
    <div :class="$style.desc">
      <span>Charges customers on a recurring basis.</span><br>
      <span>For example, a membership service.</span>
    </div>

    <el-form
      ref="form"
      :model="data"
      :rules="rules"
      :class="['card-form', $style.form]"
    >
      <el-form-item
        label="Product Name"
        prop="productName"
      >
        <el-input
          :value="data.productName"
          @input="changeValue('productName', $event)"
        />
      </el-form-item>


      <el-form-item
        label="Product Code"
      >
        <el-input
          :value="data.productCode"
          @input="changeValue('productCode', $event)"
        />
      </el-form-item>

      <el-form-item
        label="Effective Start Date"
        prop="effectiveStartDate"
      >
        <el-date-picker
          :value="data.effectiveStartDate"
          type="datetime"
          placeholder="DD/MM/YYYY"
          :editable="false"
          @input="changeValue('effectiveStartDate', $event)"
        />
        <el-tooltip placement="right">
          <div slot="content">
            <span>
              <b>Effective Start Date</b><br>
              Date when the product becomes active. From this date
              the platform will charge the customers who are assigned
              the product in the subscription.
            </span>
          </div>
          <i class="el-icon-warning" />
        </el-tooltip>
      </el-form-item>


      <el-form-item
        label="End Date"
      >
        <el-date-picker
          :value="data.endDate"
          type="datetime"
          placeholder="DD/MM/YYYY"
          :editable="false"
          @input="changeValue('endDate', $event)"
        />
        <el-tooltip placement="right">
          <div slot="content">
            <span>
              <b>End Date</b><br>
              Date when the product becomes inactive.
              The product can no longer be assigned to another customers.
              Existing customers will continue being charged for the product
              until the end of their subscription.
            </span>
          </div>
          <i class="el-icon-warning" />
        </el-tooltip>
      </el-form-item>


      <el-form-item
        label="Billing Cycle"
        prop="billingCycle"
      >
        <el-radio-group
          :value="data.billingCycle"
          @input="changeValue('billingCycle', $event)"
        >
          <el-radio label="anniversary">
            Anniversary
          </el-radio>
          <el-radio label="pro-rata">
            Pro-Rata
          </el-radio>
        </el-radio-group>
        <el-tooltip placement="right">
          <div slot="content">
            <span>
              <strong>An anniversary billing cycle</strong>
              is based on the start date of the subscription.
            </span><br>
            <span>
              <strong>A Pro-rata billing cycle</strong>
              is based on an anchor date - the customer's first bill
              is prorated from the start date of their subscription to the
              anchor date.
            </span>
          </div>
          <i class="el-icon-warning" />
        </el-tooltip>
      </el-form-item>

      <el-form-item
        v-if="data.billingCycle === 'pro-rata'"
        label="Anchor Date"
        prop="anchorDate"
        :class="$style.lastItem"
      >
        <el-date-picker
          :value="data.anchorDate"
          type="date"
          placeholder="DD/MM"
          :editable="false"
          @input="changeValue('anchorDate', $event)"
        />
        <el-tooltip placement="right">
          <div slot="content">
            <span>
              <b>Anchor date</b><br>
              A customer's first bill will be prorated from the
              start date of their subscription to the anchor date.
            </span>
          </div>
          <i class="el-icon-warning" />
        </el-tooltip>
      </el-form-item>
    </el-form>
    <anchor-dates />
  </div>
</template>

<style lang="scss" module>
@import '@design';

.root {
  display: flex;
  flex-direction: column;
  width: 32rem;
}

.desc {
  margin-bottom: 2rem;
  font-size: 1rem;
}

.lastItem {
  margin-bottom: 1rem;
}
</style>
