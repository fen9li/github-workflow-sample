<script>
import { mask } from 'vue-the-mask'

export default {
  name: 'CouponEditModal',
  directives: {
    mask,
  },
  inheritAttrs: false,
  props: {
    coupon: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      dialogVisible: false,
      form: {
        name: '',
        code: '',
        start_date: '2019-06-11T09:42:41.947Z',
        end_date: '2019-07-11T09:42:41.947Z',
        period: '',
        discount_type: 'percentage',
        amount: '0.00',
      },
      rules: {
        name: {
          required: true,
          trigger: 'blur',
        },
        code: {
          required: true,
          trigger: 'blur',
        },
        start_date: {
          required: true,
          trigger: 'blur',
        },
        end_date: {
          required: true,
          trigger: 'blur',
        },
        amount: {
          required: true,
          trigger: 'blur',
        },
      },
      currency: 'AUD',
      currencies: [
        {
          id: 1,
          label: 'AUD',
          value: 'AUD',
        },
        {
          id: 2,
          label: 'RUB',
          value: 'RUB',
        },
        {
          id: 3,
          label: 'USD',
          value: 'USD',
        },
        {
          id: 4,
          label: 'EUR',
          value: 'EUR',
        },
      ],
    }
  },
  methods: {
    onSave() {
      //
    },
  },
}
</script>

<template>
  <el-dialog
    v-bind="$attrs"
    title="Edit Coupon"
    v-on="$listeners"
  >
    <el-form
      :class="$style.form"
      :model="form"
      :rules="rules"
      label-position="top"
    >
      <el-form-item
        label="Coupon Name"
        prop="name"
      >
        <el-input v-model="form.name" />
      </el-form-item>

      <el-form-item
        label="Coupon Code"
        prop="code"
      >
        <el-input v-model="form.code" />
      </el-form-item>

      <el-col :span="11">
        <el-form-item
          label="Effective Start Date"
          prop="start_date"
        >
          <el-date-picker
            v-model="form.start_date"
            type="date"
            placeholder="Pick a date"
            style="width: 100%;"
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
          prop="end_date"
        >
          <el-date-picker
            v-model="form.end_date"
            type="date"
            placeholder="Pick a date"
            style="width: 100%;"
          />
        </el-form-item>
      </el-col>

      <el-form-item label="Validity Period">
        <el-select
          v-model="form.region"
          placeholder="Please select"
        >
          <el-option
            label="6 months"
            value="6"
          />
          <el-option
            label="12 months"
            value="12"
          />
        </el-select>
      </el-form-item>

      <el-form-item
        :class="$style.radios"
        label="Discount Type"
        prop="resource"
      >
        <el-radio-group v-model="form.discount_type">
          <el-radio label="percentage">
            Percentage
          </el-radio>
          <el-radio label="dollar-value">
            Dollar Value
          </el-radio>
        </el-radio-group>
      </el-form-item>


      <el-form-item
        label="Amount"
        prop="amount"
      >
        <el-input
          v-model="form.amount"
          v-mask="['#.##', '##.##', '###.##']"
          placeholder="Please input"
        >
          <el-button
            slot="prepend"
            :class="$style.discountTypeSign"
          >
            {{ form.discount_type === 'percentage' ? '%' : '$' }}
          </el-button>
          <el-select
            v-if="form.discount_type === 'dollar-value'"
            slot="append"
            v-model="currency"
            :class="$style.currencySelect"
          >
            <el-option
              v-for="item in currencies"
              :key="item.id"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-input>
      </el-form-item>
    </el-form>

    <el-button
      type="primary"
      :class="$style.saveButton"
      @click="onSave"
    >
      Save
    </el-button>
  </el-dialog>
</template>

<style lang="scss" module>
.radios {
  display: flex;
  align-items: center;
  width: 100%;

  &:before {
    content: none;
  }

  :global {
    .el-form-item__label {
      margin-right: 2rem;
    }
  }
}

.currencySelect {
  :global {
    .el-input {
      width: 80px;
    }
  }
}

.discountTypeSign {
  width: 38px;
  padding: 0;
}

.saveButton {
  display: block;
  width: 15rem;
  margin: 2rem auto 0;
}
</style>
