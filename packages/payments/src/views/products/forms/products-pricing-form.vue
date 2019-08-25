<script>
import { mask } from 'vue-the-mask'
import { datePickerFormat } from '@lib/utils/date-helper'

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
      datePickerFormat,
      rules: {
        name: [
          {
            required: true,
            message: 'This field is required',
            trigger: 'blur',
          },
        ],
        id: [
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
        start_at: [
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
      this.$emit('changeValue', { fieldName, newVal })
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
      label-position="top"
      :class="['modal-form', $style.form]"
    >
      <el-form-item
        label="Pricing Plan Name"
        prop="name"
      >
        <el-input
          :value="data.name"
          :class="$style.formInput"
          @input="changeValue('name', $event)"
        />
      </el-form-item>

      <el-form-item
        label="Pricing Plan Code"
        prop="id"
      >
        <el-input
          :value="data.id"
          :class="$style.formInput"
          @input="changeValue('id', $event)"
        />
      </el-form-item>

      <el-form-item
        label="Billing Interval"
        prop="frequency"
      >
        <el-select
          :value="data.frequency"
          placeholder="Please select"
          @input="changeValue('frequency', $event)"
        >
          <el-option
            label="Monthly"
            value="P1M"
          />
          <el-option
            label="Quarterly"
            value="P3M"
          />
          <el-option
            label="Yearly"
            value="P1Y"
          />
        </el-select>
      </el-form-item>

      <div class="united-field">
        <el-form-item
          label="Start Date"
          prop="start_at"
        >
          <el-date-picker
            v-mask="['##/##/####']"
            :value="data.start_at"
            type="date"
            placeholder="DD/MM/YYYY"
            format="dd/MM/yyyy"
            :value-format="datePickerFormat"
            @input="changeValue('start_at', $event)"
          />
        </el-form-item>
        <el-form-item
          label="Amount"
          prop="amount"
        >
          <div
            prop="amount"
            :class="['amount-form-item', $style.amount]"
          >
            <el-form-item
              prop="amount"
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
                placeholder="0.00"
                @input="changeValue('amount', $event)"
              >
                <template #prepend>
                  $
                </template>
              </el-input>
            </el-form-item>
            <el-select
              :value="data.currency"
              disabled
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
          </div>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<style lang="scss" module>
.root {
  width: 100%;
}

.rootOutlined {
  min-width: 36rem;
  padding: 2rem 3.5rem 2rem 3rem;
  border: 1px solid var(--color-primary);
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

.amount {
  :global {
    .el-select {
      flex-grow: 0;
    }
  }
}

</style>
