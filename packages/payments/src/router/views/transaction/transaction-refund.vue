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
        amount: null,
        currency: 'aud',
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
    @update:visible="$emit('update:visible', $event)"
  >
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-width="180px"
      label-position="left"
    >
      <el-form-item
        label="Refund Amount"
        prop="amount"
      >
        <div :class="$style.amount">
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
                '#####.##',
                '######.##',
              ]"
              placeholder="0.00"
            >
              <span
                slot="prepend"
                :class="$style.amountPrepend"
              >
                $
              </span>
            </el-input>
          </el-form-item>
          <el-form-item
            prop="currency"
          >
            <el-select v-model="form.currency">
              <el-option
                label="AUD"
                value="aud"
              />
              <el-option
                label="EUR"
                value="eur"
              />
              <el-option
                label="USD"
                value="usd"
              />
            </el-select>
          </el-form-item>
        </div>
      </el-form-item>
      <el-form-item
        label="Reason"
        prop="reason"
      >
        <el-select
          v-model="form.reason"
          placeholder="Select a reason"
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
  @import '@design';

  .note {
    color: $color-text-light;
  }

  .noteIco {
    padding-right: .5rem;
    font-size: 1rem;
    color: $primary-light;
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

</style>
