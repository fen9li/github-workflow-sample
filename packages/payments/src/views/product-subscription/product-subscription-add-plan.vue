<script>
import ProductsPricingForm from '../products/forms/products-pricing-form.vue'

export default {
  name: 'ProductSubscriptionAddPlan',
  components: {
    ProductsPricingForm,
  },
  inheritAttrs: false,
  props: {
    productId: {
      type: [String, Number],
      required: true,
    },
  },
  data() {
    return {
      processing: false,
      form: {
        name: null,
        id: null,
        frequency: null,
        start_at: null,
        amount: null,
        currency: 'aud',
      },
    }
  },
  methods: {
    updateValue({ fieldName, newVal }) {
      this.form[fieldName] = newVal
    },
    validateAll() {
      const result = []
      this.$refs.form.$children[0].validate( valid => {
        result.push(valid)
      })
      return result
    },
    async onSubmit() {
      if (!this.validateAll().some(item => item === false)) {
        this.processing = true

        const requestData = { ...this.form }
        delete requestData.currency

        const [error, response] = await this.$api.post(`/products/${this.productId}/plans`, requestData)

        this.processing = false

        if (response) {
          this.$notify({
            type: 'success',
            title: 'Success',
            message: 'Pricing Plan successfully created.',
          })

          this.$emit('update:visible', false)
          this.$emit('updated')
          this.clearForm()
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
    clearForm() {
      const { form } = this
      const keys = Object.keys(form)

      keys.forEach(key => {
        form[key] = ''
        form.currency = 'aud'
      })

      this.$refs.form.$children[0].clearValidate()
    }
  },
}
</script>

<template>
  <el-dialog
    title="Add Pricing Plan"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <products-pricing-form
      ref="form"
      :data="form"
      :modal-form="true"
      @changeValue="updateValue"
    />
    <div :class="$style.save">
      <el-button
        class="wide-button"
        type="primary"
        :loading="processing"
        data-test="submit"
        @click="onSubmit"
      >
        Save
      </el-button>
    </div>
  </el-dialog>
</template>

<style lang="scss" module>
.save {
  display: flex;
  justify-content: center;
  padding-top: 1rem;
}
</style>
