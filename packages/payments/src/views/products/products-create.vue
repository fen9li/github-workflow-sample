<script>
import appConfig from '~/app.config'
import ProductsSubscriptionForm from './forms/products-subscription-form.vue'
import ProductsSingleForm from './forms/products-single-form.vue'
import capitalize from 'lodash/capitalize'

export default {
  name: 'ProductsCreate',
  page: {
    title: 'Create Product',
    meta: [{ name: 'description', content: appConfig.description }],
  },
  components: {
    ProductsSubscriptionForm,
    ProductsSingleForm,
  },
  inheritAttrs: false,
  data() {
    return {
      product: {
        type: 'subscription',
        details: {
          name: '',
          code: '',
          start_on: '',
          end_on: '',
          billingCycle: 'pro-rata',
          anchorDate: '',
          price: '10.00',
          currency: 'aud',
          image: '',
        },
      },
    }
  },
  methods: {
    async createProduct() {
      const { details, type } = this.product

      if (!this.validateAll().some(item => item === false)) {
        const productType = `${capitalize(type)} Product`
        let requestData

        if (type === 'single') {
          requestData = {
            name: details.name,
            price: +details.price,
            // Temporary fixed id value
            id: 'PROD_999',
            start_on: details.start_on,
          }

          const [error, response] = await this.$api.post('/single-products', requestData )

          if (response) {
            this.$notify({
              type: 'success',
              title: 'Success',
              message: `${productType} created.`,
            })
            this.$emit('update:visible', false)
            this.$router.push(
              { name: `products-${type}-details`, params: { id: response.id } })
          } else if (error) {
            this.$notify({
              type: 'error',
              title: 'Error',
              message: error.message,
            })
          }
        }
      }
    },
    updateDetailsValue({ fieldName, newVal }) {
      this.product.details[fieldName] = newVal
    },
    clearDetails() {
      this.product.details = {
        name: '',
        code: '',
        start_on: '',
        end_on: '',
        billingCycle: 'anniversary',
        anchorDate: '',
        price: '10.00',
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
  <el-dialog
    title="Create Product"
    :custom-class="$style.wrapper"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <div :class="$style.types">
      <el-radio-group
        v-model="product.type"
        @change="clearDetails"
      >
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

    <products-subscription-form
      v-if="product.type === 'subscription'"
      ref="subscription"
      :data="product.details"
      @changeValue="updateDetailsValue"
    />
    <products-single-form
      v-else
      ref="single"
      :data="product.details"
      @changeValue="updateDetailsValue"
    />

    <div
      class="modal__footer"
    >
      <el-button
        type="primary"
        class="wide-button"
        @click="createProduct"
      >
        Save
      </el-button>
    </div>
  </el-dialog>
</template>

<style lang="scss" module>


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
</style>
