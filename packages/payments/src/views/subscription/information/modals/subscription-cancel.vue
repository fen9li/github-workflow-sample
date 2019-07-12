<script>
import paymentFormItem from '../../../customer/payment-methods/payment-form-item'
import get from 'lodash/get'

export default {
  name: 'EditSubscriptionCancelModal',
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
      type: 'now',
      refund: true,
      form: {
        selectedMethod: get(this.paymentMethods[0], 'value', ''),
        cancelDate: '',
        amount: '',
      },
      showAddMethodForm: false,
      rules: {
        selectedMethod: [
          {
            required: true,
            message: 'Payment method is required',
            trigger: 'blur',
          },
        ],
        cancelDate: [
          {
            required: true,
            message: 'New date is required',
            trigger: 'blur',
          },
        ],
        amount: [
          {
            required: true,
            message: 'Amount is required',
            trigger: 'blur',
          },
        ],
      },
    }
  },
  computed: {
    displayMethodForm() {
      return this.paymentMethods.length === 0 || this.showAddMethodForm
    },
  },
  methods: {
    async onSubmit() {
      if (!this.validateAll().some(item => item === false)) {
        const [error, response] = await this.$api.delete(`/subscriptions/${this.subscription.id}`)

        // const [error, response] = await this.$api.post(`/subscriptions/${this.subscription.id}/refund`, {
        //   amount: this.form.amount,
        // })

        if (response) {
          this.$notify({
            type: 'success',
            title: 'Saved',
            message: 'Changes saved successfully.',
          })

          this.$emit('update:visible', false)
          this.$emit('edited')
        } else if (error) {
          const firstError = error.violations[Object.keys(error.violations)[0]][0]
          this.$notify({
            type: 'error',
            title: 'Error',
            message: firstError,
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
        <el-radio label="after">
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
          type="date"
          placeholder="Enter Date"
          :editable="false"
          data-test="datepicker"
        />
      </el-form-item>

      <div v-if="type !== 'after'">
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
