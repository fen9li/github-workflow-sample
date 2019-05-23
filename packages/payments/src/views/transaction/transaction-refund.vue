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
        amount: '100.00',
        currency: 'aud',
        refundTo: 'account',
      },
      rules: {
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
        currency: [
          {
            required: true,
            message: 'Currency is required',
            trigger: 'blur',
          },
        ],
      },
      reasons: [
        {
          value: 'Option1',
          label: 'Option1',
        },
        {
          value: 'Option2',
          label: 'Option2',
        },
        {
          value: 'Option3',
          label: 'Option3',
        },
        {
          value: 'Option4',
          label: 'Option4',
        },
        {
          value: 'Option5',
          label: 'Option5',
        },
      ],
    }
  },
  computed: {
    accountInfo() {
      const { transaction } = this
      return `${transaction.customerName}, BSB ${transaction.bankAccount.bsb}, ACC ${transaction.bankAccount.acc}`
    },
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          console.warn('submited', this.form)
        } else {
          return false
        }
      })
    },
  },
}
</script>

<template>
  <el-dialog
    title="Refund Payment"
    :visible="visible"
    :class="$style.modal"
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
        :class="$style.refundWrapper"
        label-width="50px"
        required
      >
        <div :class="$style.radioGroup">
          <div :class="$style.account">
            <el-radio
              v-model="form.refundTo"
              label="account"
            >
              Customer's Bank Account
            </el-radio>
            <span :class="$style.accountInfo">{{ accountInfo }}</span>
          </div>
          <el-radio
            v-model="form.refundTo"
            label="ewallet"
          >
            Customer's eWallet
          </el-radio>
        </div>
      </el-form-item>
      <el-form-item
        label="Amount"
        prop="amount"
        required
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
        <el-select
          v-model="form.reason"
          placeholder="Please select"
        >
          <el-option
            v-for="item in reasons"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
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
        @click="onSubmit"
      >
        Refund
      </el-button>
    </div>
  </el-dialog>
</template>

<style lang="scss" module>
.note {
  padding: .5rem;
  color: var(--color-text-light);
  background-color: #F4F4F5;
}

.noteIco {
  padding-right: .5rem;
  font-size: 1rem;
}

.amount {
  display: flex;

  :global {
    .el-input-group__prepend,
    .el-input-group__append {
      background-color: inherit !important;
    }

    .el-input-group {
      .el-input__inner {
        border-right: 0;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }
    }

    .el-input--suffix {
      .el-input__inner {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      }
    }
  }
}
.refundWrapper {
  display: flex;
  margin-bottom: 0.8rem;
}

.radioGroup {
  margin-left: 4rem;
  :global {
    .el-radio__label {
      font-size: 1rem;
    }
  }
}

.account {
  display: flex;
  flex-direction: column;
  padding-top: 0.3rem;
}

.accountInfo {
  padding-left: 1.7rem;
  line-height: 1.7rem;
  color: #BCBEC1;
}
</style>
