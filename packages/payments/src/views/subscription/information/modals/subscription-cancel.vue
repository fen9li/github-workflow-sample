<script>
import paymentFormItem from '../../../customer/payment-methods/payment-form-item'
import get from 'lodash/get'
import { mask } from 'vue-the-mask'
import { datePickerFormat } from '@lib/utils/date-helper'
import amountMask from '@lib/utils/amount-mask'

export default {
  name: 'SubscriptionCancelModal',
  directives: {
    mask,
  },
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
      default: () => [],
    },
  },
  data() {
    return {
      datePickerFormat,
      loading: false,
      type: 'now',
      refund: true,
      form: {
        payment_source: '',
        cancelDate: '',
        amount: '',
      },
      showAddMethodForm: false,
      rules: {
        payment_source: [
          {
            required: true,
            message: 'This field is required',
            trigger: 'blur',
          },
        ],
        cancelDate: [
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
      return !get(this.customer, 'payment_sources') || this.showAddMethodForm
    },
    availablePaymentMethods() {
      return this.customer.payment_sources.filter(method => method.type === 'bank_account')
    }
  },
  methods: {
    amountMask,
    async onSubmit() {
      if (!this.validateAll().some(item => item === false)) {
        this.loading = true

        const { type, refund, form } = this

        const requestData = {}

        // TODO: Adjust requestData for real payload when postman docs is updated
        if(type !== 'end') {

          if(refund) {
            if(form.payment_source) {
              await this.refundSubscruption()
            } else {
              this.$notify({
                type: 'error',
                title: 'Error',
                message: 'Payment method is required for refund.',
              })
              this.loading = false
              return
            }
          }

          if(type === 'specific') {
            requestData.cancelDate = form.cancelDate
          }
        }

        const [error, response] = await this.$api.delete(`/subscriptions/${this.subscription.id}`,
          { data: requestData || {} })

        this.loading = true

        if (response) {
          this.$notify({
            type: 'success',
            title: 'Saved',
            message: 'Changes saved successfully.',
          })

          this.$emit('update:visible', false)
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
    async refundSubscruption() {
      const { form, subscription } = this

      const refundData = {
        amount: form.amount,
        // payment_source: {
        //   token: form.payment_source
        // }
      }

      const [error, response] = await this.$api.post(`/subscriptions/${subscription.id}/refund`, refundData)

      console.warn('refunded', error, response)

      return [error, response]
    }
  },
}
</script>

<template>
  <el-dialog
    title="Cancel Subscription"
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
      <el-radio-group
        v-model="type"
        :class="$style.radios"
      >
        <el-radio label="now">
          Cancel Immediately
        </el-radio>
        <el-radio label="end">
          Cancel at the end of the current period on {{ `${subscription.end_at || ''}` }}
        </el-radio>
        <el-radio label="specific">
          Cancel on specific date
        </el-radio>
      </el-radio-group>

      <el-form-item
        v-if="type === 'specific'"
        label="Select Date"
        :class="$style.picker"
        prop="cancelDate"
      >
        <el-date-picker
          v-model="form.cancelDate"
          v-mask="['##/##/####']"
          type="date"
          placeholder="DD/MM/YYYY"
          data-test="datepicker"
          format="dd/MM/yyyy"
          :value-format="datePickerFormat"
        />
      </el-form-item>

      <div v-if="type !== 'end'">
        <hr :class="['divider-primary', $style.divider]">
        <el-checkbox
          v-model="refund"
          data-test="refund"
        >
          Refund remaining balance
        </el-checkbox>
        <div v-if="refund">
          <payment-form-item
            prop="payment_source"
            :selected-method="form.payment_source"
            :payment-methods="availablePaymentMethods"
            :display-form="displayMethodForm"
            :customer="customer"
            :class="$style.refundTo"
            label="Refund to"
            @showForm="showAddMethodForm = $event"
            @changeMethod="form.payment_source = $event"
          />

          <div
            :class="['modal-note', $style.note]"
          >
            <i class="el-icon-info" />
            <div class="modal-note__text">
              Refund is available only for bank accounts
            </div>
          </div>

          <el-form-item
            v-if="!displayMethodForm"
            label="Balance to be Refunded"
          >
            <div
              class="amount-form-item"
            >
              <el-form-item prop="amount">
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
        </div>
      </div>
    </el-form>
    <div class="modal__footer">
      <el-button
        v-if="!displayMethodForm"
        type="primary"
        :class="$style.save"
        data-test="submit"
        :loading="loading"
        @click="onSubmit"
      >
        Set Cancellation
      </el-button>
    </div>
  </el-dialog>
</template>

<style lang="scss" module>
.wrapper {
  width: 32rem;
}

.radios {
  display: flex;
  flex-direction: column;

  :global {
    .el-radio {
      margin: .5rem 0;

      &__label {
        color: #606266 !important;
      }
    }
  }
}
.picker {
  width: 45%;
  margin: 0 0 2rem 1.8rem;
}

.divider {
  margin: 1.5rem 0;
}

.refundTo {
  margin: 1.5rem 0;
}

.save {
  width: 15rem !important;
}

.note {
  width: 18rem;
  margin-bottom: .5rem;
}

</style>
