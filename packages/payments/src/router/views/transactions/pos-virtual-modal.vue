<script>
import { mask } from 'vue-the-mask'

export default {
  name: 'POSVirtualModal',
  directives: {
    mask,
  },
  data() {
    return {
      dialogVisible: false,
      activeCollapes: ['1'],
      tab: 'card',
      form: {
        card: {
          amount: '',
          currency: 'aud',
          holderName: '',
          number: '',
          expiry: '',
          cvv: '',
          description: '',
        },
        account: {
          name: '',
          bsb: '',
          number: '',
        },
        additional: {
          companyName: '',
          firstName: '',
          lastName: '',
          phone: '',
          emailReceipt: '',
        },
      },
      disableSubmit: true,
      rules: {},
      error: {
        type: 'Transaction Failed',
        msg: 'Insufficient_Funds',
      },
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
  <div>
    <el-button
      type="primary"
      @click="dialogVisible = true"
    >
      Virtual POS
    </el-button>

    <el-dialog
      :visible.sync="dialogVisible"
      title="Virtual POS"
    >
      <div :class="$style.tabs">
        <el-tabs
          v-model="tab"
          stretch
        >
          <el-tab-pane
            label="Credit/Debit Card"
            name="card"
          >
            <el-form
              :model="form.card"
              :rules="rules"
              class="card-form"
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
                      placeholder="$0.00"
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
                label="Card No"
                required
              >
                <el-input
                  v-model="form.card.number"
                  :class="$style.short"
                />
                <div :class="$style.cardLogos">
                  <div>
                    <img
                      src="/img/visa_logo.png"
                      alt="visa"
                    >
                  </div>
                  <div>
                    <img
                      src="/img/mastercard_logo.png"
                      alt="mastercard"
                    >
                  </div>
                  <div>
                    <img
                      src="/img/amex_logo.png"
                      alt="amex"
                    >
                  </div>
                </div>
              </el-form-item>
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
              <el-form-item
                label="Description"
                required
              >
                <el-input
                  v-model="form.card.description"
                  placeholder="Reason for Charge"
                />
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane
            label="Bank Account"
            name="account"
          >
            <el-form
              :model="form.account"
              :rules="rules"
              class="card-form"
            >
              <el-form-item
                label="Account Name"
                required
              >
                <el-input
                  v-model="form.account.name"
                />
              </el-form-item>
              <el-form-item
                label="BSB"
                required
              >
                <el-input
                  v-model="form.account.bsb"
                />
              </el-form-item>
              <el-form-item
                label="Account No"
                required
              >
                <el-input
                  v-model="form.account.number"
                />
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
        <el-collapse
          v-model="activeCollapes"
          class="form-collapse"
        >
          <el-collapse-item
            title="Add more information"
            name="1"
          >
            <el-form
              :model="form.additional"
              :rules="rules"
              :class="['card-form', $style.additionalForm]"
            >
              <el-form-item
                label="Company Name"
              >
                <el-input
                  v-model="form.additional.companyName"
                />
              </el-form-item>
              <el-form-item
                label="First Name"
              >
                <el-input
                  v-model="form.additional.firstName"
                />
              </el-form-item>
              <el-form-item
                label="Last Name"
              >
                <el-input
                  v-model="form.additional.lastName"
                />
              </el-form-item>
              <el-form-item
                label="Telephone"
              >
                <el-input
                  v-model="form.additional.phone"
                />
              </el-form-item>
              <el-form-item
                label="Email Receipt"
              >
                <el-input
                  v-model="form.additional.emailReceipt"
                />
              </el-form-item>
            </el-form>
          </el-collapse-item>
        </el-collapse>

        <div :class="$style.error">
          <span>{{ error.type }}: <b>{{ error.msg }}</b> </span>
        </div>

        <div
          class="modal__footer"
        >
          <el-button
            :disabled="disableSubmit"
            :type="disableSubmit ? 'info' : 'primary'"
            class="wide-button"
            @click="onSubmit"
          >
            Process Charge
          </el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<style lang="scss" module>
@import '@design';

.short {
  width: 55%;
}

.tabs {
  :global {
    .el-tabs__content {
      margin-top: 2.5rem;
    }
  }
}

.additionalForm {
  margin-top: 1rem;
}

.cardLogos {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 45%;

  div {
    width: 1.5rem;

    img {
      width: 100%;
    }
  }
}

.error {
  width: 100%;
  padding: .6rem 1.5rem;
  font-size: 1rem;
  background-color: #FFF1F1;
  border-radius: .4rem;
}
</style>
