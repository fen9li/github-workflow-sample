<script>
import ProductsPricingForm from '../products/forms/products-pricing-form.vue'

export default {
  name: 'ProductSubscriptionAddPlan',
  components: {
    ProductsPricingForm,
  },
  inheritAttrs: false,
  data() {
    return {
      planDetails: {
        name: '',
        billingInterval: '',
        startDate: '',
        amount: '10.00',
        currency: 'aud',
      },
    }
  },
  methods: {
    updateValue({ fieldName, newVal }) {
      this.planDetails[fieldName] = newVal
    },
    savePlan() {
      this.$refs.addPlanForm.$children[0].validate( valid => {
        if (valid) {
          this.$notify({
            type: 'success',
            title: 'Success',
            message: 'Pricing Plan successfully created.',
          })

          this.$emit('update:visible', false)
        }
      })
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
