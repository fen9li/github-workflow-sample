<script>
import ProductsSubscriptionForm from
  '../products/forms/products-subscription-form.vue'

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
        name: '',
        billing_type: '',
        id: '',
        start_on: '',
      },
    }
  },
  watch: {
    currentProduct() {
      this.formatData()
    },
  },
  created() {
    this.formatData()
  },
  methods: {
    updateDetailsValue({ fieldName, newVal }) {
      this.formData[fieldName] = newVal
    },
    async onSubmit() {
      if (!this.validateAll().some(item => item === false)) {
        const [error, response] = await this.$api.put(`/products/${this.currentProduct.id}`, { name: this.formData.name })
        if (response) {
          this.$notify({
            type: 'success',
            title: 'Success',
            message: 'Changes saved successfully.',
          })

          this.$emit('update:visible', false)
          this.$emit('edited')
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
    validateAll() {
      const result = []
      this.$refs.form.$children[0].validate( valid => {
        result.push(valid)
      })
      return result
    },
    formatData() {
      // Formatting temporary while API subscription product works only with groups
      const { formData, currentProduct } = this
      formData.name = currentProduct.name
      formData.billing_type = currentProduct.group.billing_type
      formData.id = currentProduct.id
      formData.start_on = currentProduct.start_on
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


.form {
  margin-bottom: -1rem;
}
</style>
