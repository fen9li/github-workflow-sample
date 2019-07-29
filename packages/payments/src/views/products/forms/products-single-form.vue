<script>
import { mask } from 'vue-the-mask'
import { datePickerFormat } from '@lib/utils/date-helper'

export default {
  name: 'ProductsSingleForm',
  directives: {
    mask,
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
        start_at: [
          {
            required: true,
            message: 'This field is required',
            trigger: 'blur',
          },
        ],

        end_at: [
          {
            required: true,
            message: 'This field is required',
            trigger: 'blur',
          },
        ],
        'price.total': [
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
      class="modal-form"
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
        prop="id"
      >
        <el-input
          :value="data.id"
          :disabled="edit"
          @input="changeValue('id', $event)"
        />
      </el-form-item>

      <div class="united-field">
        <el-form-item
          label="Effective Start Date"
          prop="start_at"
        >
          <el-date-picker
            :value="data.start_at"
            type="date"
            placeholder="Enter Date"
            :editable="false"
            :value-format="datePickerFormat"
            @input="changeValue('start_at', $event)"
          />
        </el-form-item>

        <el-form-item label="End Date">
          <el-date-picker
            :value="data.end_at"
            type="date"
            placeholder="Enter Date"
            :editable="false"
            :value-format="datePickerFormat"
            @input="changeValue('end_at', $event)"
          />
        </el-form-item>
      </div>

      <el-form-item label="Amount">
        <div
          class="amount-form-item"
        >
          <el-form-item
            prop="price.total"
          >
            <el-input
              v-mask="[
                '#.##',
                '##.##',
                '###.##',
                '####.##',
                '#####.##'
              ]"
              :value="data.price.total"
              placeholder="$0.00"
              @input="changeValue('price.total', $event)"
            >
              <template #prepend>
                $
              </template>
            </el-input>
          </el-form-item>
          <el-select
            :value="data.price.currency"
            disabled
            @input="changeValue('price.currency', $event)"
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
    </el-form>
  </div>
</template>

<style lang="scss" module>

.root {
  display: flex;
  flex-direction: column;
  margin-bottom: -1rem;
}
</style>
