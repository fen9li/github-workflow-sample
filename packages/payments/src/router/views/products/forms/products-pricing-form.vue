<script>
import { mask } from 'vue-the-mask'

export default {
  name: 'ProductsPricingForm',
  directives: {
    mask,
  },
  props: {
    label: {
      type: String,
      default: 'Pricing Plan',
    },
    data: {
      type: Object,
      required: true,
    },
    modalForm: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      rules: {
        name: [
          {
            required: true,
            message: 'This field is required',
            trigger: 'blur',
          },
        ],
        billingInterval: [
          {
            required: true,
            message: 'This field is required',
            trigger: 'blur',
          },
        ],
        startDate: [
          {
            required: true,
            message: 'This field is required',
            trigger: 'blur',
          },
        ],
        amount: [
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
      const { id } = this.data
      this.$emit('changeValue', { fieldName, newVal, id })
    },
  },
}
</script>

<template>
  <div :class="[$style.root, {[$style.rootOutlined]: !modalForm} ]">
    <div
      v-if="!modalForm"
      :class="$style.label"
    >
      {{ label }}
    </div>
    <el-form
      ref="form"
      :model="data"
      :rules="rules"
      :class="['card-form', $style.form]"
    >
      <el-form-item
        label="Pricing Plan Name"
        prop="name"
        disabled
      >
        <el-input
          :value="data.name"
          placeholder="Monthly Membership PA"
          :class="$style.formInput"
          @input="changeValue('name', $event)"
        />
      </el-form-item>

      <el-form-item
        label="Billing Interval"
        prop="billingInterval"
      >
        <el-select
          :value="data.billingInterval"
          placeholder="Please select"
          @input="changeValue('billingInterval', $event)"
        >
          <el-option
            label="Monthly"
            value="monthly"
          />
          <el-option
            label="Yearly"
            value="yearly"
          />
          <el-option
            label="Quarterly"
            value="quarterly"
          />
        </el-select>
      </el-form-item>

      <el-form-item
        label="Start Date"
        prop="startDate"
      >
        <el-date-picker
          :value="data.startDate"
          type="datetime"
          placeholder="DD/MM/YYYY"
          :editable="false"
          @input="changeValue('startDate', $event)"
        />
        <el-tooltip
          v-if="!modalForm"
          placement="right"
        >
          <div slot="content">
            <span>
              <b>Tooltip</b><br>
              Tooltip description.Coming soon.
            </span>
          </div>
          <i :class="['el-icon-warning', $style.tooltipIcon]" />
        </el-tooltip>
      </el-form-item>

      <el-form-item
        label="Amount"
        prop="amount"
        :class="[$style.formItem, 'amount-form-item']"
      >
        <el-input
          v-mask="[
            '#.##',
            '##.##',
            '###.##',
            '####.##',
            '#####.##'
          ]"
          :value="data.amount"
          placeholder="$0.00"
          @input="changeValue('amount', $event)"
        >
          <template #prepend>
            $
          </template>
        </el-input>
        <el-select
          :value="data.currency"
          @input="changeValue('currency', $event)"
        >
          <el-option
            label="AUD"
            value="aud"
          />
          <el-option
            label="USD"
            value="usd"
          />
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="scss" module>
@import '@design';

.root {
  width: 100%;
}

.rootOutlined {
  min-width: 36rem;
  padding: 2rem 3.5rem 2rem 3rem;
  border: 1px solid $color-primary;
  border-radius: 0.4rem;
}

.label {
  width: 100%;
  padding-bottom: 2rem;
  font-size: 1.2rem;
  font-weight: 700;
  color: #303133;
  text-align: center;
}

.form {
  margin: auto;
}

</style>
