<script>
import { mask } from 'vue-the-mask'
import paymentFormItem from '../payment-methods/payment-form-item'
import ElasticProcessor from '@lib/processors/elastic-processor'

export default {
  name: 'CustomerDetailsAddProductModal',
  components: {
    paymentFormItem,
  },
  directives: {
    mask,
  },
  props: {
    customer: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      showAddMethodForm: false,
      form: {
        product: '',
        amount: '',
        selectedMethod: '',
      },
      productsData: {
        data: [],
        loading: true,
      },
      rules: {
        product: [
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
        selectedMethod: [
          {
            required: true,
            message: 'This field is required',
            trigger: 'blur',
          },
        ],
      },
    }
  },
  computed: {
    displayMethodForm() {
      return this.customer.paymentMethods.length === 0 || this.showAddMethodForm
    },
    allProducts() {
      return this.productsData.data.map(product => {
        return { value: product.id, label: product.name }
      })
    },
  },
  created() {
    this.getProductsCoupons()
  },
  methods: {
    onSubmit() {
      this.showAddMethodForm = false
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$notify({
            type: 'success',
            title: 'Success',
            message: 'Product successfully added.',
          })
          // this.$emit('update:visible', false)
        } else {
          return false
        }
      })
    },
    getProductsCoupons() {
      this.productsData = new ElasticProcessor({
        component: this,
        index: 'single-products',
      })
    },
  },
}
</script>

<template>
  <div>
    <el-dialog
      title="Add Product"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-position="top"
        :class="[$style.form]"
      >
        <el-form-item
          label="Customer"
        >
          <el-input
            :value="customer.fullName"
            disabled
          />
        </el-form-item>

        <el-form-item
          label="Single Product"
          prop="product"
        >
          <el-select
            v-model="form.product"
            v-loading="productsData.loading"
            placeholder="Please select"
          >
            <el-option
              v-for="product in allProducts"
              :key="product.value"
              :value="product.value"
              :label="product.label"
            />
          </el-select>
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
                v-model="form.amount"
                v-mask="[
                  '#.##',
                  '##.##',
                  '###.##',
                  '####.##',
                  '#####.##'
                ]"
                placeholder="$0.00"
              >
                <template #prepend>
                  $
                </template>
              </el-input>
            </el-form-item>
            <el-select
              value=""
              disabled
              placeholder="AUD"
            />
          </div>
        </el-form-item>

        <hr :class="['divider-primary', $style.divider]">

        <payment-form-item
          :selected-method="form.selectedMethod"
          :payment-methods="customer.paymentMethods"
          :display-form="displayMethodForm"
          @showForm="showAddMethodForm = $event"
          @changeMethod="form.selectedMethod = $event"
        />
      </el-form>
      <el-button
        v-if="!displayMethodForm"
        type="primary"
        :class="[$style.save, 'wide-button']"
        @click="onSubmit"
      >
        Save
      </el-button>
    </el-dialog>
  </div>
</template>

<style lang="scss" module>
.save {
  display: block;
  margin: 0 auto;
}

.divider {
  margin: 2rem 0;
}
</style>
