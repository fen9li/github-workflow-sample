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
          id: '',
          start_on: '',
          anchor_on: '',
          billing_type: 'anniversary',
          price: '0.00',
          currency: 'aud',
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
        const requestUrl = type === 'single' ? '/single-products' : '/products'

        if (type === 'single') {
          requestData = {
            name: details.name,
            price: details.price,
            id: details.id,
            start_on: details.start_on,
            active: true,
          }
        } else {
          requestData = {
            group: {
              id: details.billing_type === 'anniversary' ? 'DEMO_GROUP_ONE' : 'DEMO_GROUP_THREE',
            },
            name: details.name,
            id: details.id,
            billing_type: details.billing_type,
            anchor_on: details.anchor_on,
            start_on: details.start_on,
          }
        }

        const [error, response] = await this.$api.post(requestUrl, requestData )

        if (response) {
          this.$notify({
            type: 'success',
            title: 'Success',
            message: `${productType} created.`,
          })
          this.$emit('update:visible', false)
        } else if (error) {
          this.$notify({
            type: 'error',
            title: 'Error',
            message: error.message,
          })
        }
      }
    },
    updateDetailsValue({ fieldName, newVal }) {
      this.product.details[fieldName] = newVal
    },
    clearDetails() {
      this.product.details = {
        name: '',
        id: '',
        start_on: '',
        end_on: '',
        billing_type: 'anniversary',
        price: '0.00',
        currency: 'aud',
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
          <div :class="$style.radioWrap">
            <span :class="$style.radioTitle">
              Subscription product
            </span>
            <span :class="$style.radioText">
              Charges customers on a <br>
              recurring basis. For <br>
              example, a membership <br>
              service.
            </span>
          </div>
        </el-radio>
        <el-radio
          label="single"
          border
        >
          <div :class="$style.radioWrap">
            <span :class="$style.radioTitle">
              Single Product
            </span>
            <span :class="$style.radioText">
              A product offered to a <br>
              customer on a per-order <br>
              basis. For example, <br>
              tangible single sale items.
            </span>
          </div>
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
  width: 36rem;
  max-width: 36rem !important;
}

.types {
  margin-bottom: 2rem;

  :global {
    .el-radio-group {
      display: flex;
      justify-content: space-between;
    }
    .el-radio {
      display: flex;
      width: 47%;
      height: auto;
      padding: 1rem;
      margin: 0;
      white-space: normal;
    }
    .el-radio__label {
      font-size: 1rem;
    }
  }
}

.radioWrap {
  display: flex;
  flex-direction: column;
}

.radioTitle {
  color: var(--color-text) !important;
  // font-size: 1rem;
}

.radioText {
  padding-top: .5rem;
  font-size: .9rem;
  color: #6A6C70 !important;
}
</style>
