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
        start_on: [
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
    handleImageSuccess(res, file) {
      this.changeValue('image', URL.createObjectURL(file.raw) )
    },
    beforeImageUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$notify({
          type: 'warning',
          title: 'Error',
          message: 'Avatar picture must be JPG format!',
        })
      }
      if (!isLt2M) {
        this.$notify({
          type: 'warning',
          title: 'Error',
          message: 'Avatar picture size can not exceed 2MB!',
        })
      }
      return isJPG && isLt2M
    },
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
      <span>A product offered to a customer on a per-order basis.</span><br>
      <span>For example, tangible single sale items.</span>
    </div>

    <el-form
      ref="form"
      :model="data"
      :rules="rules"
      label-position="left"
      class="card-form"
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

      <el-form-item
        label="Effective Start Date"
        prop="start_on"
      >
        <el-date-picker
          :value="data.start_on"
          type="datetime"
          placeholder="DD/MM/YYYY"
          :editable="false"
          @input="changeValue('start_on', $event)"
        />
      </el-form-item>

      <el-form-item label="End Date">
        <el-date-picker
          :value="data.end_on"
          type="datetime"
          placeholder="DD/MM/YYYY"
          :editable="false"
          @input="changeValue('end_on', $event)"
        />
      </el-form-item>

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
        :value="data.image"
        label="Image (optional)"
      >
        <el-upload
          :class="$style.imageUploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleImageSuccess"
          :before-upload="beforeImageUpload"
        >
          <img
            v-if="data.image"
            :src="data.image"
          >
          <el-button
            v-else
            slot="trigger"
            type="primary"
            plain
          >
            Select File
          </el-button>
        </el-upload>
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

.desc {
  margin-bottom: 2rem;
  font-size: 1rem;
}

.imageUploader {
    width: 100%;
    min-height: 40px;
    border: 1px solid #DCDFE6;
    border-radius: 5px;

    div {
      display: block;
      text-align: left;
    }

    button {
      border-color:#409EFF !important;
    }

    img {
      width: 100%;
  }
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
