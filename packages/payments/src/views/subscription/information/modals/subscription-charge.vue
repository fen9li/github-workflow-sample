<script>
import paymentFormItem from '../../../customer/payment-methods/payment-form-item'
import get from 'lodash/get'
import amountMask from '@lib/utils/amount-mask'

export default {
  name: 'AmountChargeOwingModal',
  components: {
    paymentFormItem,
  },
  props: {
    subscription: {
      type: Object,
      default: () => {},
    },
    customer: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      processing: false,
      showAddMethodForm: false,
      form: {
        amount: get(this.subscription,'outstanding.total', null),
        selectedMethod: get(this.customer,'payment_sources[0].token', null),
      },
      rules: {
        payment_source: [
          {
            required: true,
            message: 'This field is required',
            trigger: 'blur',
          },
        ],
        amount: [
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
    amountMask,
    async onSubmit() {
      if (!this.validateAll().some(item => item === false)) {

        const { customer, form, subscription } = this
        this.processing = true

        const requestData = {
          amount: form.amount,
          customer: {
            id: customer.id
          },
          payment_source: {
            token: form.selectedMethod,
          },
          subscription: {
            id: subscription.id
          },
        }

        const [error, response] = await this.$api.post('/orders', requestData)

        this.processing = false

        if (response) {
          this.$notify({
            type: 'success',
            title: 'Success',
            message: `Changes saved successfully`,
          })
          this.$emit('update:visible', false)
          this.$emit('update:should-update', true)
          this.$emit('updated')
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
    title="Charge Amount Owing"
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

      <el-form-item
        label="Subscription"
      >
        <el-input
          :value="subscription.current_product.name"
          disabled
          data-test="subscription"
        />
      </el-form-item>

      <el-form-item
        label="Amount to Pay"
      >
        <div
          class="amount-form-item"
        >
          <el-form-item
            prop="amount"
          >
            <el-input
              :value="form.amount"
              placeholder="0.00"
              data-test="amount"
              @input="form.amount = amountMask($event)"
            >
              <template #prepend>
                $
              </template>
            </el-input>
          </el-form-item>
          <el-select
            value=""
            placeholder="AUD"
            disabled
          />
        </div>
      </el-form-item>

      <hr :class="['divider-primary', $style.divider]">
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
        Charge Now
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

.divider {
  margin: 2rem 0 1.5rem;
}
</style>
