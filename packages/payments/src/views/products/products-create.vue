<script>
import appConfig from '~/app.config'
import ProductsSubscriptionForm from './forms/products-subscription-form.vue'
import ProductsSingleForm from './forms/products-single-form.vue'
import capitalize from 'lodash/capitalize'
import set from 'lodash/set'

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
      type: 'subscription',
      form: {
        name: null,
        id: null,
        billing_type: 'anniversary',
        start_at: null,
        end_at: null,
        anchor_at: null,
        sunset_at: null,
        price: {
          total: null,
          currency: 'aud',
        },
      },
    }
  },
  methods: {
    async createProduct() {
      const { form, type } = this

      if (!this.validateAll().some(item => item === false)) {
        const productType = `${capitalize(type)} Product`
        let requestData
        const requestUrl = type === 'single' ? '/single-products' : '/products'

        if (type === 'single') {
          requestData = {
            name: form.name,
            price: form.price.total,
            id: form.id,
            start_at: form.start_at,
            end_at: form.end_at,
          }
        } else {
          requestData = {
            name: form.name,
            id: form.id,
            billing_type: form.billing_type,
            anchor_at: form.anchor_at,
            sunset_at: form.sunset_at,
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
          this.$emit('update:update-table', true)
        } else if (error) {
          const violations = Object.keys(error.violations)
          violations.forEach(violation => {
            setTimeout(() => {
              this.$notify({
                type: 'error',
                title: 'Error',
                message: `${violation}: ${error.violations[violation][0]}`,
              })
            }, 50)
          })
        }
      }
    },
    updateDetailsValue({ fieldName, newVal }) {
      set(this.form, fieldName, newVal )
    },
    clearDetails() {
      this.form = {
        name: null,
        id: null,
        billing_type: 'anniversary',
        start_at: null,
        end_at: null,
        anchor_at: null,
        sunset_at: null,
        price: {
          total: null,
          currency: 'aud',
        },
      }
    },
    validateAll() {
      const result = []
      const { $refs, type } = this
      $refs[type].$children[0].validate( valid => {
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
        v-model="type"
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
      v-if="type === 'subscription'"
      ref="subscription"
      :data="form"
      @changeValue="updateDetailsValue"
    />
    <products-single-form
      v-else
      ref="single"
      :data="form"
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
}

.radioText {
  padding-top: .5rem;
  font-size: .9rem;
  color: #6A6C70 !important;
}
</style>
