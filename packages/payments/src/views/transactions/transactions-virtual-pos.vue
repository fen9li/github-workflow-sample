<script>
import { mask } from 'vue-the-mask'

export default {
  name: 'TransactionsVirtualPOS',
  directives: {
    mask,
  },
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      form: {
        card: {
          amount: '',
          currency: 'aud',
          holderName: '',
          number: '',
          expiry: '',
          cvv: '',
          email: '',
        },
      },
      disableSubmit: true,
      rules: {},
    }
  },
  methods: {
    onSubmit() {
      console.warn(this.form)
    },
  },
}
</script>

<template>
  <el-dialog
    title="Virtual POS"
    :visible="visible"
    :class="$style.modal"
    @update:visible="$emit('update:visible', $event)"
  >
    <el-form
      :model="form.card"
      :rules="rules"
      label-position="top"
      label-width="200px"
      class="modal-form"
    >
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
              v-model="form.card.amount"
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
            v-model="form.card.currency"
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
        required
      >
        <el-input
          v-model="form.card.holderName"
        />
      </el-form-item>
      <el-form-item
        label="Card No."
        :class="$style.cardNumber"
      >
        <el-input
          v-model="form.card.number"
          v-mask="'#### #### #### ####'"
          placeholder="---- ---- ---- ----"
          :class="$style.short"
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
      <div :class="$style.unitedField">
        <el-form-item
          label="Expiry"
          required
        >
          <el-input
            v-model="form.card.expiry"
            v-mask="'##/##'"
            :class="$style.short"
          />
        </el-form-item>
        <el-form-item
          label="CVV"
          required
        >
          <el-input
            v-model="form.card.cvv"
            v-mask="'###'"
            :class="$style.short"
          />
        </el-form-item>
      </div>
      <el-form-item
        label="Email"
      >
        <el-input
          v-model="form.card.email"
        />
      </el-form-item>
      <div :class="$style.moreInfo">
        <el-button
          type="text"
          :class="$style.moreBtn"
        >
          + Add more information
        </el-button>
      </div>
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
.unitedField {
  display: flex;
  justify-content: space-between;

  :global {
    .el-form-item {
      flex-basis: 47% !important;
    }
  }
}

// .cardNumber {
//   position: relative;
// }

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

.moreBtn {
  padding-bottom: 0;
  font-size: 1rem;
}
</style>
