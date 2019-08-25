<script>
import { mask } from 'vue-the-mask'

export default {
  name: 'TransactionsVirtualPOS',
  directives: {
    mask,
  },
  data() {
    return {
      form: {
        amount: '',
        currency: 'aud',
        name: '',
        number: '',
        expiry: '',
        cvv: '',
        email: '',
      },
      disableSubmit: false,
      showError: true,
      error: 'Transaction Failed: Insufficient_Funds',
      rules: {
        amount: [
          {
            required: true,
            message: 'This field is required',
            trigger: 'blur',
          },
        ],
        name: [
          {
            required: true,
            message: 'This field is required',
            trigger: 'blur',
          },
        ],
        number: [
          {
            required: true,
            message: 'This field is required',
            trigger: 'blur',
          },
        ],
        expiry: [
          {
            required: true,
            message: 'This field is required',
            trigger: 'blur',
          },
        ],
        cvv: [
          {
            required: true,
            message: 'This field is required',
            trigger: 'blur',
          },
        ],
        email: [
          {
            required: true,
            message: 'This field is required',
            trigger: 'blur',
          },
        ],
      },
    }
  },
  methods: {
    onSubmit() {
      if (!this.validateAll().some(item => item === false)) {
        // if (response) {
        //   this.$notify({
        //     type: 'success',
        //     title: 'Saved',
        //     message: 'Transactions successfully made',
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
        console.warn(this.form)
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
    title="Virtual POS"
    :class="$style.modal"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-position="top"
      label-width="200px"
      class="modal-form"
    >
      <el-form-item
        label="Amount"
      >
        <div
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
              data-test="amount"
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
        label="Card Holder Name"
        prop="name"
      >
        <el-input
          v-model="form.name"
          data-test="name"
        />
      </el-form-item>
      <el-form-item
        label="Card No."
        :class="$style.cardNumber"
        prop="number"
      >
        <el-input
          v-model="form.number"
          v-mask="'#### #### #### ####'"
          placeholder="----  ----  ----  ----"
          :class="[$style.short, $style.cardInput]"
          data-test="number"
        />
        <div :class="$style.cardLogos">
          <div :class="$style.logoWrapper">
            <img
              src="/img/visa_logo.png"
              alt="visa"
              :class="$style.logo"
            >
          </div>
          <div :class="$style.logoWrapper">
            <img
              src="/img/mastercard_logo.png"
              alt="mastercard"
              :class="$style.logo"
            >
          </div>
          <div :class="$style.logoWrapper">
            <img
              src="/img/amex_logo.png"
              alt="amex"
              :class="$style.logo"
            >
          </div>
        </div>
      </el-form-item>
      <div class="united-field">
        <el-form-item
          label="Expiry"
          prop="expiry"
        >
          <el-input
            v-model="form.expiry"
            v-mask="'##/##'"
            :class="$style.short"
            placeholder="MM/YY"
            data-test="expiry"
          />
        </el-form-item>
        <el-form-item
          label="CVV"
          prop="cvv"
        >
          <el-input
            v-model="form.cvv"
            v-mask="'###'"
            :class="$style.short"
            data-test="cvv"
          />
        </el-form-item>
      </div>
      <el-form-item
        label="Email"
        prop="email"
      >
        <el-input
          v-model="form.email"
          data-test="email"
        />
      </el-form-item>
      <!-- <div
        v-if="error && showError"
        :class="$style.error"
      >
        <i class="el-icon-error" />
        <span> {{ error }}</span>
        <i
          :class="['el-icon-close']"
          @click="showError = false"
        />
      </div> -->
    </el-form>
    <div
      class="modal__footer"
    >
      <el-button
        :disabled="disableSubmit"
        class="wide-button"
        :type="disableSubmit ? 'info' : 'primary'"
        data-test="submit"
        @click="onSubmit"
      >
        Process Charge
      </el-button>
    </div>
  </el-dialog>
</template>

<style lang="scss" module>
.modal {
  :global {
    .el-dialog {
      max-width: 35rem !important
    }
  }
}

.cardLogos {
  position: absolute;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-right: 1rem;
}

.logoWrapper {
  width: 1.9rem;
  margin-left: 0.4rem;
}

.logo {
  width: 100%;
}

.moreInfo {
  display: flex;
  justify-content: flex-end;
}

.error {
  display: flex;
  align-items: center;
  padding: .6rem 1rem;
  color: var(--color-error);
  background-color: #FEF0F0;
  border-radius: rem(4px);

  :global {
    .el-icon-close,
    .el-icon-error {
      font-size: 1rem;
    }
    .el-icon-close {
      margin-left: auto;
      font-weight: 600;
      color: var(--color-text);
      cursor: pointer;
    }

    .el-icon-error {
      margin-right: .5rem;
    }
  }
}

.cardInput {
  :global {
    .el-input__inner::placeholder {
      font-size: 1.2rem;
      line-height: 1.2rem;
    }
  }
}
</style>
