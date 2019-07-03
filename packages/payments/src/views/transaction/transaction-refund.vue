<script>
import { mask } from 'vue-the-mask'

export default {
  name: 'TransactionRefund',
  directives: { mask },
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    transaction: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      form: {
        reason: '',
        amount: '',
        currency: 'aud',
      },
      rules: {
        refundTo: [
          {
            required: true,
            message: 'This field is required',
            trigger: 'blur',
          },
        ],
        reason: [
          {
            required: true,
            message: 'Reason is required',
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
    refundTo() {
      const { customer } = this.transaction.order
      // TODO: Adjust to real data when one is done
      return `${customer.first_name} ${customer.last_name}, BSB 178-8297, ACC 727873`
    },
  },
  methods: {
    async unSubmit() {
      const { transaction, form } = this
      if (!this.validateAll().some(item => item === false)) {
        const [error, response] = await this.$api.post(`/orders/${transaction.order.id}/refund`,
          {
            amount: form.amount,
            reason: form.reason,
          }
        )

        if (response) {
          this.$notify({
            type: 'success',
            title: 'Success',
            message: `Refund paid successfully`,
          })
          this.$emit('update:visible', false)
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
    title="Refund Payment"
    :visible="visible"
    :custom-class="$style.modal"
    @update:visible="$emit('update:visible', $event)"
  >
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      class="modal-form"
      label-width="200px"
      label-position="top"
    >
      <el-form-item
        label="Refund to"
      >
        <el-select
          :value="refundTo"
          disabled
        />
      </el-form-item>
      <el-form-item
        label="Amount"
        prop="amount"
      >
        <div
          prop="amount"
          class="amount-form-item"
        >
          <el-form-item
            prop="amount"
          >
            <el-input
              v-model="form.amount"
              v-mask="[
                '#.##',
                '##.##',
                '###.##',
                '####.##',
                '#####.##'
              ]"
              placeholder="0.00"
            >
              <template #prepend>
                $
              </template>
            </el-input>
          </el-form-item>
          <el-select
            v-model="form.currency"
            disabled
          >
            <el-option
              label="AUD"
              value="aud"
            />
            <el-option
              label="USD"
              value="usd"
            />
          </el-select>
        </div>
      </el-form-item>
      <el-form-item
        label="Reason"
        prop="reason"
      >
        <el-input
          v-model="form.reason"
          placeholder="Please select"
        />
      </el-form-item>
    </el-form>
    <div :class="$style.note">
      <i :class="[$style.noteIco, 'el-icon-info']" />
      Refunds take 5-10 days to appear on a customer's statement.
    </div>
    <div class="modal__footer">
      <el-button
        class="wide-button"
        type="primary"
        @click="unSubmit"
      >
        Refund
      </el-button>
    </div>
  </el-dialog>
</template>

<style lang="scss" module>
.modal {
  width: 30rem;
}

.note {
  padding: .5rem;
  color: var(--color-text-light);
  background-color: #F4F4F5;
}

.noteIco {
  padding-right: .5rem;
  font-size: 1rem;
}
</style>
