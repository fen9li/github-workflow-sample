<script>
import pricingPlanForm from '../create/pricing-plan-form'

export default {
  name: 'AddSubscriptionPlanModal',
  components: {
    pricingPlanForm,
  },
  data() {
    return {
      dialogVisible: false,
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
          this.$message.success({
            dangerouslyUseHTMLString: true,
            message:
            '<strong>Success</strong><p>Pricing Plan successfully created.</p>',
            showClose: true,
          })
          this.dialogVisible = false
        } else {
          this.$message.error({
            dangerouslyUseHTMLString: true,
            message: '<strong>Error</strong><p>Changes were not saved.</p>',
            showClose: true,
          })
        }
      })
    },
  },
}
</script>

<template>
  <div>
    <el-button
      type="primary"
      size="small"
      @click="dialogVisible = true"
    >
      Add
    </el-button>

    <el-dialog
      title="Add Pricing Plan"
      :visible.sync="dialogVisible"
    >
      <pricing-plan-form
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
  </div>
</template>

<style lang="scss" module>
@import '@design';

.save {
  display: flex;
  justify-content: center;
  padding-top: 1rem;
}
</style>
