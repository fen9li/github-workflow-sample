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
      planDetails: {
        name: '',
        id: '',
        frequency: '',
        start_on: '',
        amount: '',
        currency: 'aud',
      },
    }
  },
  methods: {
    updateValue({ fieldName, newVal }) {
      this.planDetails[fieldName] = newVal
    },
    validateAll() {
      const result = []
      this.$refs.addPlanForm.$children[0].validate( valid => {
        result.push(valid)
      })
      return result
    },
    async savePlan() {
      if (!this.validateAll().some(item => item === false)) {
        const [error, response] = await this.$api.post(`/products/${this.productId}/plans`, this.planDetails)

        if (response) {
          this.$notify({
            type: 'success',
            title: 'Success',
            message: 'Pricing Plan successfully created.',
          })

          this.$emit('update:visible', false)
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
      ref="addPlanForm"
      :data="planDetails"
      :modal-form="true"
      @changeValue="updateValue"
    />
    <div :class="$style.save">
      <el-button
        class="wide-button"
        type="primary"
        @click="savePlan"
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
