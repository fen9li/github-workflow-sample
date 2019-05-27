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
        name: [
          {
            required: true,
            message: 'This field is required',
            trigger: 'blur',
          },
        ],
        start_on: [
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
        end_on: [
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
    <el-form
      ref="form"
      :model="data"
      :rules="rules"
      label-position="top"
      :class="['modal-form', $style.form]"
    >
      <el-form-item
        label="Product Name"
        prop="name"
      >
        <el-input
          :value="data.name"
          @input="changeValue('name', $event)"
        />
      </el-form-item>

      <el-form-item
        label="Product Code"
      >
        <el-input
          :value="data.code"
          @input="changeValue('code', $event)"
        />
      </el-form-item>

      <div class="united-field">
        <el-form-item
          label="End Date"
          prop="end_on"
        >
          <el-date-picker
            :value="data.end_on"
            type="datetime"
            placeholder="DD/MM/YYYY"
            :editable="false"
            @input="changeValue('end_on', $event)"
          />
        </el-form-item>

        <el-form-item
          label="Anchor Date"
          :prop="edit ? '': 'start_on'"
          :class="{[$style.disabled]: edit}"
        >
          <el-date-picker
            :value="data.start_on"
            type="datetime"
            placeholder="DD/MM/YYYY"
            :editable="false"
            :disabled="edit"
            @input="changeValue('start_on', $event)"
          />
        </el-form-item>
      </div>

      <el-form-item
        label="Billing Cycle"
        :prop="edit ? '': 'billingCycle'"
        :class="[$style.billing, {[$style.disabled]: edit}]"
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

.lastItem {
  margin-bottom: 1rem;
}

.disabled {
  label {
    color: #C0C4CC !important;
  }
}

.billing {
  display: flex;

  :global {
    .el-form-item__content {
      padding-left: 3rem;
    }
  }
}

.anchor {
  margin-bottom: -1rem;
}
</style>
