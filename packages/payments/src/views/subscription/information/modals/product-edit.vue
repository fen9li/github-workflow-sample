<script>
import ElasticProcessor from '@lib/processors/elastic-processor'
import { nextDay, sameDate } from '@lib/utils/date-helper'

export default {
  name: 'EditSubscriptionEditProductModal',
  props: {
    subscription: {
      type: Object,
      default: () => {},
    },
    customerName: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      processing: false,
      loadingPlans: false,
      form: {
        product: '',
        frequency: '',
      },
      productsData: {
        data: [],
        loading: true,
      },
      subscriptioHistory: {},
      frequencies: [],
      rules: {
        product: [
          {
            required: true,
            message: 'This field is required',
            trigger: 'blur',
          },
        ],
        frequency: [
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
    allProducts() {
      return this.productsData.data.map(product => {
        return {
          value: product.id,
          label: product.name,
          anchor_at: product.anchorAt,
          type: product.billingType
        }
      }).filter(prod => {
        const currentAnchor = this.subscription.current_product.group.anchor_at
        return prod.type === 'prorata' && sameDate(currentAnchor, prod.anchor_at)
      })
    },
  },
  watch: {
    'form.product'(newVal) {
      this.getProductPlans(newVal)
    }
  },
  created() {
    this.getAllProducts()
    this.getSubscriptioHistory()

    const { form, subscription } = this
    const currentFrequency = subscription.current_frequency
    const currentProduct = subscription.current_product
    form.frequency = currentFrequency ? currentFrequency.frequency : ''
    form.product = currentProduct ? currentProduct.id : ''
  },
  methods: {
    async onSubmit() {
      this.processing = true
      const { form, subscription } = this

      const requestData = {
        frequency: form.frequency,
        product: {
          id: form.product,
        },
        start_at: nextDay(),
      }

      const [error,] = await this.$api.put(`/subscriptions/${subscription.id}/upgrade`, requestData)

      this.processing = false

      if (error) {
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
      } else {
        this.$notify({
          type: 'success',
          title: 'Success',
          message: `Changes saved successfully`,
        })
        this.$emit('update:visible', false)
        this.$emit('updated')
      }
    },
    getAllProducts() {
      this.productsData = new ElasticProcessor({
        component: this,
        index: 'subscription-products',
      })
    },
    async getSubscriptioHistory() {
      const [error, response] = await this.$api.get(`/subscriptions/${this.subscription.id}/history`)

      console.warn(error, response)
    },
    async getProductPlans(id) {
      this.loadingPlans = true
      const [, response] = await this.$api.post(`/search/subscription-product-pricing-plans/_search`,
        { query: { match: { productId: id } } }
      )
      this.loadingPlans = false

      if(response) {
        const formated = []
        response.hits.hits.forEach(item => {
          const value = item._source.billingInterval
          const index = formated.findIndex(form => form.value === value)

          if(index === -1) {

            let label = ''
            switch(value) {
              case 'P1M': label = 'Monthly'
                break
              case 'P3M': label = 'Quarterly'
                break
              case 'P1Y': label = 'Yearly'
                break
            }

            formated.push({ value, label })
          }
        })

        this.frequencies = formated
      }
    }
  },
}
</script>

<template>
  <el-dialog
    title="Change Subscription Product"
    :custom-class="$style.wrapper"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <el-form
      ref="form"
      :model="form"
      class="modal-form"
      :rules="rules"
      label-width="200px"
      label-position="top"
    >
      <el-form-item
        label="Customer"
      >
        <el-input
          :value="customerName"
          disabled
          data-test="customer"
        />
      </el-form-item>
      <el-form-item
        v-loading="productsData.loading"
        label="Subscription Product"
        prop="product"
      >
        <el-select
          v-model="form.product"
          placeholder="Select"
        >
          <el-option
            v-for="item in allProducts"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="Frequency"
        prop="frequency"
      >
        <el-select
          v-model="form.frequency"
          v-loading="loadingPlans"
          placeholder="Select"
        >
          <el-option
            v-for="item in frequencies"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <div class="modal-note">
      <i class="el-icon-info" />
      <div class="modal-note__text">
        Editing the Subscription Product or Pricing Plan may cause changes to payment dates, billing frequencies, and the subscription balance.
      </div>
    </div>
    <div class="modal__footer">
      <el-button
        type="primary"
        :class="$style.save"
        data-test="submit"
        :loading="processing"
        @click="onSubmit"
      >
        Save
      </el-button>
    </div>
  </el-dialog>
</template>

<style lang="scss" module>
.wrapper {
  width: 32rem;
}

.save {
  width: 15rem !important;
}
</style>
