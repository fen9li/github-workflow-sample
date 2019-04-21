<script>
import ProductsAnchorDates from './products-anchor-dates'
import { mask } from 'vue-the-mask'

export default {
  name: 'ProductsSubscriptionForm',
  directives: {
    mask,
  },
  components: {
    ProductsAnchorDates,
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
    edit: {
      type: Boolean,
      default: false,
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
    <div
      v-if="!edit"
      :class="$style.desc"
    >
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
        :prop="edit ? '': 'effectiveStartDate'"
        :class="{[$style.disabled]: edit}"
      >
        <el-date-picker
          :value="data.effectiveStartDate"
          type="datetime"
          placeholder="DD/MM/YYYY"
          :editable="false"
          :disabled="edit"
          @input="changeValue('effectiveStartDate', $event)"
        />
        <el-tooltip
          v-if="!edit"
          placement="right"
        >
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
        <el-tooltip
          v-if="!edit"
          placement="right"
        >
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
        :prop="edit ? '': 'billingCycle'"
        :class="{[$style.disabled]: edit}"
      >
        <el-radio-group
          :value="data.billingCycle"
          :disabled="edit"
          @input="changeValue('billingCycle', $event)"
        >
          <el-radio label="anniversary">
            Anniversary
          </el-radio>
          <el-radio label="pro-rata">
            Pro-Rata
          </el-radio>
        </el-radio-group>
        <el-tooltip
          v-if="!edit"
          placement="right"
        >
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
        :prop=" edit ? '' : 'anchorDate'"
        :class="[$style.lastItem, {[$style.disabled]: edit}]"
      >
        <el-date-picker
          :value="data.anchorDate"
          type="date"
          placeholder="DD/MM"
          :editable="false"
          :disabled="edit"
          @input="changeValue('anchorDate', $event)"
        />
        <el-tooltip
          v-if="!edit"
          placement="right"
        >
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
    <products-anchor-dates
      v-if="!edit"
      :class="$style.anchor"
    />
  </div>
</template>

<style lang="scss" module>


.root {
  display: flex;
  flex-direction: column;
}

.desc {
  margin-bottom: 2rem;
  font-size: 1rem;
}

.lastItem {
  margin-bottom: 1rem;
}

.disabled {
  label {
    color: #C0C4CC !important;
  }
}

.anchor {
  margin-bottom: -1rem;
}
</style>
