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
        id: [
          {
            required: true,
            message: 'This field is required',
            trigger: 'blur',
          },
        ],
        billing_type: [
          {
            required: true,
            message: 'This field is required',
            trigger: 'blur',
          },
        ],
        anchor_on: [
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
          :class="$style.tooltipField"
          @input="changeValue('name', $event)"
        />
        <el-tooltip
          placement="right"
          :class="$style.tooltip"
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

      <el-form-item
        label="Product Code"
        prop="id"
      >
        <el-input
          :value="data.id"
          :class="$style.tooltipField"
          @input="changeValue('id', $event)"
        />
        <el-tooltip
          placement="right"
          :class="$style.tooltip"
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

      <el-form-item
        label="Billing Cycle"
        :prop="edit ? '': 'billing_type'"
        :class="[$style.billing, {[$style.disabled]: edit}]"
      >
        <el-radio-group
          :value="data.billing_type"
          :disabled="edit"
          @input="changeValue('billing_type', $event)"
        >
          <el-radio label="anniversary">
            Anniversary
          </el-radio>
          <el-radio label="prorata">
            Pro rata
          </el-radio>
        </el-radio-group>
      </el-form-item>

      <div class="united-field">
        <el-form-item label="Start Date">
          <el-date-picker
            :value="data.start_on"
            type="datetime"
            placeholder="Enter Date"
            :editable="false"
            @input="changeValue('start_on', $event)"
          />
        </el-form-item>

        <el-form-item
          v-if="data.billing_type === 'prorata'"
          label="Anchor Date"
          :prop="edit ? '': 'anchor_on'"
          :class="{[$style.disabled]: edit}"
        >
          <el-date-picker
            :value="data.anchor_on"
            type="datetime"
            placeholder="Enter Date"
            :editable="false"
            :disabled="edit"
            @input="changeValue('anchor_on', $event)"
          />
          <el-tooltip
            placement="right"
            :class="$style.tooltip"
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
      </div>
    </el-form>
    <products-anchor-dates
      v-if="!edit && data.billing_type === 'prorata'"
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

.tooltipField {
  :global {
    .el-input__inner {
      padding-right: 2rem !important;
    }
  }
}

.tooltip {
  position: absolute;
  right: .5rem;
  color: #909399 !important;
}
</style>
