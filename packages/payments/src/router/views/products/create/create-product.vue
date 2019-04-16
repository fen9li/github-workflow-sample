<script>
import appConfig from '@src/app.config'
import subscriptionProductForm from './product-details/create-subscription'
import singleProductForm from './product-details/create-single'
import cloneDeep from 'lodash/cloneDeep'
import capitalize from 'lodash/capitalize'

export default {
  name: 'CreateProductModal',
  page: {
    title: 'Create Product',
    meta: [{ name: 'description', content: appConfig.description }],
  },
  components: {
    subscriptionProductForm,
    singleProductForm,
  },
  data() {
    return {
      dialogVisible: false,
      product: {
        type: 'subscription',
        details: {
          productName: '',
          productCode: '',
          effectiveStartDate: '',
          endDate: '',
          billingCycle: 'pro-rata',
          anchorDate: '',
          amount: '10.00',
          currency: 'aud',
          image: '',
        },
      },
    }
  },
  methods: {
    createProduct() {
      const newProduct = cloneDeep(this.product)
      const { details } = newProduct

      if (newProduct.type === 'subscription') {
        delete details.amount
        delete details.currency
        delete details.image
      } else {
        delete details.billingCycle
        delete details.anchorDate
        delete newProduct.pricingPlans
      }
      if (this.validateAll().some(item => item === false)) {
        this.$message.error({
          dangerouslyUseHTMLString: true,
          message:
          `<strong>Error</strong><p>Changes were not saved.</p>`,
          showClose: true,
        })
      } else {
        const productType = `${capitalize(this.product.type)} Product`

        this.$message.success({
          dangerouslyUseHTMLString: true,
          message:
          `<strong>Success</strong><p>${productType} created.</p>`,
          showClose: true,
        })
      }
    },
    updateDetailsValue({ fieldName, newVal }) {
      this.product.details[fieldName] = newVal
    },
    clearDetails() {
      this.product.details = {
        productName: '',
        productCode: '',
        effectiveStartDate: '',
        endDate: '',
        billingCycle: 'anniversary',
        anchorDate: '',
        amount: '10.00',
        currency: 'aud',
        image: '',
      }
    },
    validateAll() {
      const result = []
      const { $refs, product } = this
      $refs[product.type].$children[0].validate( valid => {
        result.push(valid)
      })
      return result
    },
  },
}
</script>

<template>
  <div>
    <el-button
      type="primary"
      @click="dialogVisible = true"
    >
      Create Product
    </el-button>
    <el-dialog
      title="Create Product"
      :visible.sync="dialogVisible"
      :custom-class="$style.wrapper"
    >
      <div :class="$style.types">
        <el-radio-group v-model="product.type">
          <el-radio
            label="subscription"
            border
          >
            Subscription product
          </el-radio>
          <el-radio
            label="single"
            border
          >
            Single Product
          </el-radio>
        </el-radio-group>
      </div>

      <subscription-product-form
        v-if="product.type === 'subscription'"
        ref="subscription"
        :data="product.details"
        @changeValue="updateDetailsValue"
      />
      <single-product-form
        v-else
        ref="single"
        :data="product.details"
        @changeValue="updateDetailsValue"
      />

      <el-button
        type="primary"
        :class="[$style.save, 'wide-button']"
        @click="createProduct"
      >
        Save
      </el-button>
    </el-dialog>
  </div>
</template>

<style lang="scss" module>
@import '@design';

.wrapper {
  max-width: 37rem !important;
}

.types {
  width: 30rem;
  margin-bottom: 2rem;

  :global {
    .el-radio-group {
      display: flex;
      justify-content: space-between;
      width: 100%;
    }
    .el-radio {
      width: 48%;
      height: auto;
      padding: 1rem;
      margin: 0;
    }
    .el-radio__label {
      font-size: 1rem;
      font-weight: 700;
    }
  }
}

.save {
  display: block;
  margin: 0 auto;
}
</style>
