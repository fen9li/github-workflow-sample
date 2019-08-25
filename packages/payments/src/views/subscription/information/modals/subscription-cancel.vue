<script>
import paymentFormItem from '../../../customer/payment-methods/payment-form-item'
import get from 'lodash/get'
import { mask } from 'vue-the-mask'
import { datePickerFormat } from '@lib/utils/date-helper'

export default {
  name: 'EditSubscriptionCancelModal',
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
    paymentMethods: {
      type: Array,
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
        selectedMethod: get(this.paymentMethods[0], 'token', ''),
        cancelDate: '',
        amount: '',
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
      return !get(this.paymentMethods, 'length') || this.showAddMethodForm
    },
  },
  methods: {
    async onSubmit() {
      if (!this.validateAll().some(item => item === false)) {
        this.loading = true

        const { type, refund, form } = this

        const requestData = {}

        // TODO: Adjust requestData for real payload when postman docs is updated
        if(type !== 'end') {

          if(refund) {
            await this.refundSubscruption()
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
        amount: form.amount
      }

      const [error, response] = await this.$api.post(`/subscriptions/${subscription.id}/refund`, refundData)

      console.warn(error, response)

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
        <payment-form-item
          v-if="refund"
          :selected-method="form.selectedMethod"
          :payment-methods="paymentMethods"
          :display-form="displayMethodForm"
          :class="$style.refundTo"
          label="Refund to"
          @showForm="showAddMethodForm = $event"
          @changeMethod="form.selectedMethod = $event"
        />

        <el-form-item
          v-if="refund && !displayMethodForm"
          label="Balance to be Refunded"
          prop="amount"
        >
          <div
            class="amount-form-item"
          >
            <el-form-item prop="amount">
              <el-input
                v-model="form.amount"
                v-mask="['#.##', '##.##', '###.##', '####.##', '#####.##']"
                placeholder="0.00"
                data-test="amount"
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

</style>
