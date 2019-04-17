<script>
import { mask } from 'vue-the-mask'

export default {
  name: 'CreateSingleProductForm',
  directives: {
    mask,
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      form: {
        productName: '',
        productCode: '',
        effectiveStartDate: '',
        endDate: '',
        amount: '10.00',
        currency: 'aud',
        image: '',
      },
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
        this.$message.error('Avatar picture must be JPG format!')
      }
      if (!isLt2M) {
        this.$message.error('Avatar picture size can not exceed 2MB!')
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
    <div :class="$style.desc">
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
        prop="effectiveStartDate"
      >
        <el-date-picker
          :value="data.effectiveStartDate"
          :editable="false"
          type="datetime"
          placeholder="DD/MM/YYYY"
          @input="changeValue('effectiveStartDate', $event)"
        />
      </el-form-item>

      <el-form-item label="End Date">
        <el-date-picker
          :value="data.endDate"
          :editable="false"
          type="datetime"
          placeholder="DD/MM/YYYY"
          @input="changeValue('endDate', $event)"
        />
      </el-form-item>

      <el-form-item
        label="Amount"
        prop="amount"
      >
        <div
          prop="amount"
          class="amount-form-item"
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
              placeholder="$0.00"
              @input="changeValue('amount', $event)"
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
          :show-file-list="false"
          :on-success="handleImageSuccess"
          :before-upload="beforeImageUpload"
          action="https://jsonplaceholder.typicode.com/posts/"
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
    </el-form>
  </div>
</template>

<style lang="scss" module>

.root {
  display: flex;
  flex-direction: column;
  width: 30rem;
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
</style>
