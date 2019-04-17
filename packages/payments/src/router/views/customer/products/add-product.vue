<script>
import { mask } from 'vue-the-mask'
import paymentFormItem from '../payment-methods/payment-form-item'

export default {
  name: 'CustomerDetailsAddProductModal',
  components: {
    paymentFormItem,
  },
  directives: {
    mask,
  },
  data() {
    return {
      dialogVisible: false,
      showAddMethodForm: false,
      productForm: {
        customerName: 'Mary Gregov',
        singleProduct: '1',
        amount: '10.00',
        currency: 'aud',
        selectedMethod: 1,
      },
      paymentMethods: [
        {
          value: 1,
          label: '**** 7493 MasterCard',
        },
        {
          value: 2,
          label: '**** 8888 Visa',
        },
      ],
      rules: {},
    }
  },
  computed: {
    displayMethodForm() {
      return this.paymentMethods.length === 0 || this.showAddMethodForm
    },
  },
  methods: {
    payNow() {
      this.showAddMethodForm = false
    },
  },
}
</script>

<template>
  <div>
    <el-button
      class="wide-button"
      type="primary"
      size="small"
      @click="dialogVisible = true"
    >
      Add
    </el-button>

    <el-dialog
      :visible.sync="dialogVisible"
      title="Add Product"
    >
      <el-form
        :model="productForm"
        :rules="rules"
        :class="['card-form', $style.form]"
      >
        <el-form-item
          label="Customer Name"
        >
          <span :class="$style.customerName">
            {{ productForm.customerName }}
          </span>
        </el-form-item>

        <el-form-item
          label="Subscription Product"
          prop="subscriptionProduct"
          required
        >
          <el-select
            v-model="productForm.singleProduct"
            placeholder="Please select"
          >
            <el-option
              value="1"
              label="T-shirt size M - Black"
            />
            <el-option
              value="2"
              label="T-shirt size S - Blue"
            />
          </el-select>
        </el-form-item>

        <el-form-item
          :class="$style.formItem"
          label="Amount"
          prop="amount"
          required
        >
          <el-input
            v-model="productForm.amount"
            v-mask="['#.##', '##.##', '###.##']"
            :class="$style.amountValue"
            placeholder="$0.00"
          >
            <template #prepend>
              $
            </template>
          </el-input>
          <el-select
            v-model="productForm.currency"
            :class="$style.amountSelect"
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
        </el-form-item>

        <hr class="divider-primary">

        <payment-form-item
          :selected-method="productForm.selectedMethod"
          :payment-methods="paymentMethods"
          :display-form="displayMethodForm"
          @showForm="showAddMethodForm = $event"
          @changeMethod="productForm.selectedMethod = $event"
        />
      </el-form>
      <el-button
        v-if="!displayMethodForm"
        :class="[$style.save, 'wide-button']"
        type="primary"
        @click="payNow"
      >
        Pay Now
      </el-button>
    </el-dialog>
  </div>
</template>

<style lang="scss" module>
@import '@design';

.customerName {
  font-size: 1rem;
}

.amountBlock {
  display: flex;
  align-items: flex-end;
}

.amountValue {
  width: 75%;

  :global(.el-input__inner) {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
}

.amountSelect {
  width: 6rem;

  :global(.el-input__inner) {
    border-left: none;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
}

.save {
  display: block;
  margin: 0 auto;
}
</style>
