<script>
import ImageUploader from '@lib/components/image-uploader'
import { mask } from 'vue-the-mask'
import { datePickerFormat } from '@lib/utils/date-helper'

export default {
  name: "EditProviderProduct",
  directives: {
    mask,
  },
  components: {
    ImageUploader
  },
  props: {
    id: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      datePickerFormat,
      form: {
        categories: {},
      },
      rules: {
        name: [
          {
            required: true,
            message: 'This field is required',
            trigger: 'blur',
          },
        ],
        description: [
          {
            required: true,
            message: 'This field is required',
            trigger: 'blur',
          },
        ],
        aviability: [
          {
            required: true,
            message: 'This field is required',
          },
        ],
        aviability_status: [
          {
            required: true,
            message: 'This field is required',
          },
        ],
        status: [
          {
            required: true,
            message: 'This field is required',
          },
        ],
        brand: [
          {
            required: true,
            message: 'This field is required',
            trigger: 'blur',
          },
        ],
        sku: [
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
    onCancel() {
      this.$router.push({
        name: 'provider-product',
        params: {
          id: this.id,
        },
      })
    },
    onSave() {
      this.$refs.form.validate(valid => {
        if (valid) {
          // Request
          this.$router.push({
            name: 'provider-product-edit-price',
          })
        } else {
          return false
        }
      })
    },
  },
}
</script>

<template>
  <div>
    <h3 :class="$style.title">
      Product Details
    </h3>
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-position="top"
    >
      <div :class="$style.columns">
        <el-form-item
          label="Product name"
          prop="name"
        >
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item
          label="Description"
          prop="description"
        >
          <el-input v-model="form.description" />
        </el-form-item>

        <el-form-item
          label="Product Aviable"
          prop="aviability"
        >
          <el-radio-group
            v-model="form.aviability"
          >
            <el-radio
              label="yes"
              :class="$style.radio"
            >
              Yes
            </el-radio>
            <el-radio
              label="no"
              :class="$style.radio"
            >
              No
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="Aviability Status"
          prop="aviability_status"
        >
          <el-select
            v-model="form.aviability_status"
          >
            <el-option
              label="Aviable"
              value="aviable"
            />
            <el-option
              label="Not Aviable"
              value="not_aviable"
            />
          </el-select>
        </el-form-item>

        <div :class="$style.columns">
          <el-form-item label="Aviability Start Date">
            <el-date-picker
              v-model="form.start_at"
              v-mask="['##/##/####']"
              type="date"
              format="dd/MM/yyyy"
              :value-format="datePickerFormat"
              placeholder="Enter Date"
              :class="$style.datePicker"
            />
          </el-form-item>
          <el-form-item label="Aviability End Date">
            <el-date-picker
              v-model="form.end_at"
              v-mask="['##/##/####']"
              type="date"
              format="dd/MM/yyyy"
              :value-format="datePickerFormat"
              placeholder="Enter Date"
              :class="$style.datePicker"
            />
          </el-form-item>
        </div>
        <el-form-item
          label="Status"
          prop="status"
        >
          <el-select
            v-model="form.status"
          >
            <el-option
              label="Active"
              value="active"
            />
            <el-option
              label="Inactive"
              value="inactive"
            />
          </el-select>
        </el-form-item>

        <el-form-item
          label="Image URL/s"
          prop="img"
        >
          <image-uploader
            :image="form.img"
            :class="$style.uploader"
          >
            <span slot="button-text">
              Upload
            </span>
          </image-uploader>
        </el-form-item>
        <el-form-item
          label="Brand"
          prop="brand"
        >
          <el-input v-model="form.brand" />
        </el-form-item>

        <el-form-item
          label="SKU"
          prop="sku"
        >
          <el-input v-model="form.sku" />
        </el-form-item>
        <el-form-item
          label="GTIN"
        >
          <el-input v-model="form.gtin" />
        </el-form-item>

        <el-form-item
          label="Model"
        >
          <el-input v-model="form.model" />
        </el-form-item>
        <el-form-item
          label="MPN"
        >
          <el-input v-model="form.mpn" />
        </el-form-item>
      </div>

      <h4>
        Categories
      </h4>
      <div :class="$style.categories">
        <el-form-item
          label="Product Group"
        >
          <el-select
            v-model="form.categories.groups"
          >
            <el-option
              label="Group 1"
              value="group_1"
            />
            <el-option
              label="Group 2"
              value="group_2"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="Product Tiers"
        >
          <el-select
            v-model="form.categories.tiers"
          >
            <el-option
              label="Tier 1"
              value="tier_1"
            />
            <el-option
              label="Tier 2"
              value="tier_2"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="Product Categories"
        >
          <el-select
            v-model="form.categories.categories"
          >
            <el-option
              label="Category 1"
              value="category_1"
            />
            <el-option
              label="Category 2"
              value="category_2"
            />
          </el-select>
        </el-form-item>
      </div>

      <div>
        <el-button
          type="primary"
          plain
          :class="$style.button"
          @click="onCancel"
        >
          Cancel
        </el-button>
        <el-button
          type="primary"
          :class="$style.button"
          @click="onSave"
        >
          Save
        </el-button>
      </div>
    </el-form>
  </div>
</template>

<style lang="scss" module>
.title {
  margin-bottom: rem(24px);
}

.columns {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: rem(30px);
}

.datePicker {
  width: auto !important;
}

.categories {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: rem(30px);
}

.button {
  width: rem(180px);
}
</style>
