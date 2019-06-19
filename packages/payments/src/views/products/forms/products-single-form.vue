<script>
import { mask } from 'vue-the-mask'

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
        start_on: [
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
        price: [
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
          @input="changeValue('id', $event)"
        />
      </el-form-item>

      <div class="united-field">
        <el-form-item
          label="Effective Start Date"
          prop="start_on"
        >
          <el-date-picker
            :value="data.start_on"
            type="datetime"
            placeholder="Enter Date"
            :editable="false"
            @input="changeValue('start_on', $event)"
          />
        </el-form-item>

        <el-form-item label="End Date">
          <el-date-picker
            :value="data.end_on"
            type="datetime"
            placeholder="Enter Date"
            :editable="false"
            @input="changeValue('end_on', $event)"
          />
        </el-form-item>
      </div>

      <el-form-item
        label="Amount"
        prop="price"
      >
        <div
          prop="amount"
          class="amount-form-item"
        >
          <el-form-item
            prop="price"
          >
            <el-input
              v-mask="[
                '#.##',
                '##.##',
                '###.##',
                '####.##',
                '#####.##'
              ]"
              :value="data.price"
              placeholder="$0.00"
              @input="changeValue('price', $event)"
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

      <el-form-item
        v-if="edit"
        :class="$style.active"
      >
        <span :class="{[$style.inactive]: data.active === 'inactive' }">
          Active
        </span>
        <el-switch
          active-color="#13ce66"
          active-value="active"
          inactive-value="inactive"
          :value="data.active"
          @input="changeValue('active', $event)"
        />
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

.unitedField {
  display: flex;
  justify-content: space-between;
}

.active {
  display: flex;
  align-items: center;

  span {
    padding-right: 1rem;
    font-size: initial;
    color: #13ce66;
  }
}

.inactive {
  color: #C0C4CC !important;
}
</style>
