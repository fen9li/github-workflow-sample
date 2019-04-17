<script>
import ProductsSubscriptionForm from
  '../products/forms/products-subscription-form.vue'
import cloneDeep from 'lodash/cloneDeep'

export default {
  name: 'ProductSubscriptionEdit',
  components: {
    ProductsSubscriptionForm,
  },
  inheritAttrs: false,
  props: {
    currentProduct: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      formData: {
        productName: '',
        productCode: '',
        effectiveStartDate: '',
        endDate: '',
        billingCycle: 'pro-rata',
        anchorDate: '',
      },
    }
  },
  mounted() {
    this.formData = cloneDeep(this.currentProduct)
  },
  methods: {
    updateDetailsValue({ fieldName, newVal }) {
      this.formData[fieldName] = newVal
    },
    onSubmit() {
      if (!this.validateAll().some(item => item === false)) {
        this.$notify({
          type: 'success',
          title: 'Success',
          message: 'Changes saved successfully.',
        })

        this.$emit('update:visible', false)
      }
    },
    validateAll() {
      const result = []
      this.$refs.form.$children[0].validate( valid => {
        result.push(valid)
      })
      return result
    },
  },
}
</script>

<template>
  <el-dialog
    title="Edit Subscription Product"
    v-bind="$attrs"
    :custom-class="$style.root"
    v-on="$listeners"
  >
    <products-subscription-form
      ref="form"
      :data="formData"
      :edit="true"
      :class="$style.form"
      @changeValue="updateDetailsValue"
    />
    <div
      class="modal__footer"
    >
      <el-button
        type="primary"
        class="wide-button"
        @click="onSubmit"
      >
        Save
      </el-button>
    </div>
  </el-dialog>
</template>

<style lang="scss" module>
@import '@design';

.form {
  margin-bottom: -1rem;
}
</style>
