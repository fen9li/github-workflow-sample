<script>
import formatDollar from '@utils/format-dollar'
import { mask } from 'vue-the-mask'

export default {
  name: 'CustomerInformationChargeModal',
  directives: {
    mask,
  },
  props: {
    row: {
      type: Object,
      required: true,
    },
    customer: {
      type: Object,
      default: () => {
        return {
          customerName: 'Mary Gregov',
          subscription: 'PA Plus',
        }
      },
    },
  },
  data() {
    return {
      dialogVisible: false,
      form: {
        amount: '',
        currency: 'usd',
        paymentMethod: '2',
      },
      rules: {
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
    balance() {
      return this.row.outstandingBalance
    },
    formattedBalance() {
      return formatDollar(this.balance)
    },
    disableSubmit() {
      return false
    },
  },
  watch: {
    dialogVisible(newVal) {
      if (newVal) {
        this.resetForm()
      }
    },
  },
  methods: {
    resetForm() {
      this.form = {
        amount: this.row.currentAmount,
        paymentMethod: this.row.paymentMethod,
        currency: this.row.currency,
      }
    },
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$notify({
            type: 'success',
            title: 'Success',
            message: 'Amount Owing charged successfully.',
          })
          this.dialogVisible = false
        } else {
          return false
        }
      })
    },
  },
}
</script>

<template>
  <div
    v-if="balance"
    @click.stop=""
  >
    <div>
      <span :class="$style.balance">
        {{ formattedBalance }}
      </span>
      <el-button
        type="primary"
        size="small"
        @click.stop="dialogVisible = true"
      >
        Charge
      </el-button>
    </div>
    <el-dialog
      :visible.sync="dialogVisible"
      title="Charge Amount Owing"
    >
      <el-form
        ref="form"
        :rules="rules"
        class="card-form"
        :model="form"
      >
        <el-form-item label="Customer Name">
          <span :class="$style.text">
            {{ customer.customerName }}
          </span>
        </el-form-item>
        <el-form-item label="Subscription">
          <span :class="$style.text">
            {{ customer.subscription }}
          </span>
        </el-form-item>
        <el-form-item label="Pricing Plan">
          <span :class="$style.text">
            {{ row.currentInterval }}
          </span>
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
                placeholder="$0.00"
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

        <hr :class="['divider-primary', $style.divider]">

        <el-form-item
          label="Payment Method"
          prop="paymentMethod"
          required
        >
          <div :class="$style.newPayment">
            <el-button type="text">
              + Add new Payment Method
            </el-button>
            <el-select v-model="form.paymentMethod">
              <el-option
                label="Option 1"
                value="1"
              />
              <el-option
                label="Option 2"
                value="2"
              />
              <el-option
                label="Option 3"
                value="3"
              />
            </el-select>
          </div>
        </el-form-item>
      </el-form>
      <div
        class="modal__footer"
      >
        <el-button
          :disabled="disableSubmit"
          class="wide-button"
          :type="disableSubmit ? 'info' : 'primary'"
          @click="onSubmit"
        >
          Charge Now
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>


<style lang="scss" module>
@import '@design';

.balance {
  margin-right: 10px;
  color: $color-error;
}

.text {
  font-size: 1rem;
}

.divider {
  margin: 0 0 1.5rem;
}

.newPayment {
  display: flex;
  flex-direction: column;
}
</style>
