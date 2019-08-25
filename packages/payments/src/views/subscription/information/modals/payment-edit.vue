<script>
import paymentFormItem from '../../../customer/payment-methods/payment-form-item'
import get from 'lodash/get'

export default {
  name: 'EditSubscriptionPaymentModal',
  components: {
    paymentFormItem,
  },
  props: {
    customer: {
      type: Object,
      default: () => {},
    },
    subscription: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      processing: false,
      form: {
        selectedMethod: get(this.customer, 'payment_sources[0].token', ''),
      },
      showAddMethodForm: false,
      rules: {
        selectedMethod: [
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
    displayMethodForm() {
      return !get(this.customer.payment_sources, 'length') || this.showAddMethodForm
    },
  },
  methods: {
    async onSubmit() {
      if (!this.validateAll().some(item => item === false)) {

        // if (response) {
        //   this.$notify({
        //     type: 'success',
        //     title: 'Success',
        //     message: `Changes saved successfully`,
        //   })
        //   this.$emit('update:visible', false)
        //   this.$emit('updated')
        // } else if (error) {
        //   const violations = Object.keys(error.violations)
        //   violations.forEach(violation => {
        //     setTimeout(() => {
        //       this.$notify({
        //         type: 'error',
        //         title: 'Error',
        //         message: `${violation}: ${error.violations[violation][0]}`,
        //       })
        //     }, 50)
        //   })
        // }

      }
    },
    validateAll() {
      const result = []
      this.$refs.form.validate( valid => {
        result.push(valid)
      })
      return result
    },
  },
}
</script>

<template>
  <el-dialog
    title="Change Payment Method"
    :custom-class="$style.wrapper"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      class="modal-form"
      label-position="top"
    >
      <el-form-item
        label="Customer"
      >
        <el-input
          :value="customer.fullName"
          disabled
          data-test="customer"
        />
      </el-form-item>

      <payment-form-item
        :selected-method="form.selectedMethod"
        :payment-methods="customer.payment_sources"
        :display-form="displayMethodForm"
        @showForm="showAddMethodForm = $event"
        @changeMethod="form.selectedMethod = $event"
      />
    </el-form>
    <div class="modal__footer">
      <el-button
        v-if="!displayMethodForm"
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
