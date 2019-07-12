<script>
import ElasticProcessor from '@lib/processors/elastic-processor'
import { nextDay } from '@lib/utils/date-helper'

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
      form: {
        product: '',
        frequency: '',
      },
      productsData: {
        data: [],
        loading: true,
      },
      frequencies: [
        {
          label: 'Monthly',
          value: 'P1M',
        },
        {
          label: 'Quarterly',
          value: 'P3M',
        },
        {
          label: 'Yearly',
          value: 'P1Y',
        },
      ],
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
        return { value: product.id, label: product.name }
      })
    },
  },
  created() {
    this.getAllProducts()

    const { form, subscription } = this
    const currentFrequency = subscription.current_frequency
    const currentProduct = subscription.current_product
    form.frequency = currentFrequency ? currentFrequency.frequency : ''
    form.product = currentProduct ? currentProduct.id : ''
  },
  methods: {
    async onSubmit() {
      const { form, subscription } = this

      const requestData = {
        frequency: form.frequency,
        product: {
          id: form.product,
        },
        start_at: nextDay(),
      }

      const [error, response] = await this.$api.put(`/subscriptions/${subscription.id}/upgrade`, requestData)

      if (response) {
        this.$notify({
          type: 'success',
          title: 'Success',
          message: `Changes saved successfully`,
        })
        this.$emit('update:visible', false)
      } else if (error) {
        const firstError = error.violations[Object.keys(error.violations)[0]][0]
        this.$notify({
          type: 'error',
          title: 'Error',
          message: firstError,
        })
      }
    },
    getAllProducts() {
      this.productsData = new ElasticProcessor({
        component: this,
        index: 'subscription-products',
      })
    },
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
        Editing the Subscription Product pr Pricing Plan may cause changes to payment dates, billing frequencies, and the subscription balance.
      </div>
    </div>
    <div class="modal__footer">
      <el-button
        type="primary"
        :class="$style.save"
        data-test="submit"
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
