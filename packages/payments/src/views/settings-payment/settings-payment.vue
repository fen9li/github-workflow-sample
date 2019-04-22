<script>
import appConfig from '~/app.config'

export default {
  name: 'PaymentSettings',
  page: {
    title: 'Payment Settings',
    meta: [{ name: 'description', content: appConfig.description }],
  },
  data() {
    return {
      paymentSettings: {
        accountNumber: 'WBC (AU) **** 9289 / 03 9287',
        rules: {
          cards: {
            firstRetry: 're_3',
            secondRetry: 're_5',
            action: 'cancel',
          },
          accounts: {
            firstRetry: 're_1',
            secondRetry: 're_3',
            action: 'notify_email',
          },
        },
      },
      formRulesAttemptsOptions: [
        { label: 'Retry next day the previous attempt', value: 're_1' },
        { label: 'Retry 3 days after the previous attempt', value: 're_3' },
        { label: 'Retry 5 days after the previous attempt', value: 're_5' },
      ],
      formRulesActionOptions: [
        { label: 'Cancel the Subscription', value: 'cancel' },
        { label: 'Notify via email', value: 'notify_email' },
      ],
      // Account form
      form: {
        accountName: null,
        bsb: null,
        account: null,
        statementDescriptor: null,
        paymentMethods: [],
      },
      rules: {
        // Account form rules
        accountName: [
          {
            required: true,
            message: 'This field is required',
            trigger: 'blur',
          },
        ],
        bsb: [
          {
            required: true,
            message: 'This field is required',
            trigger: 'blur',
          },
        ],
        account: [
          {
            required: true,
            message: 'This field is required',
            trigger: 'blur',
          },
        ],
        statementDescriptor: [
          {
            required: true,
            message: 'This field is required',
            trigger: 'blur',
          },
          // {
          //   max: 22,
          //   message: '22 characters max',
          //   trigger: ['blur', 'change'],
          // },
        ],
      },
    }
  },
  computed: {
    paymentMethods() {
      return [
        {
          label: 'Visa',
          value: 'visa',
          img: '/img/visa_logo.png',
        },
        {
          label: 'BPAY',
          value: 'bpay',
          img: '/img/bank_icon.png',
        },
        {
          label: 'Mastercard',
          value: 'mastercard',
          img: '/img/mastercard_logo.png',
        },
        {
          label: 'Direct Debit',
          value: 'direct-debit',
          img: '/img/bank_icon.png',
        },
        {
          label: 'Amex',
          value: 'amex',
          img: '/img/amex_logo.png',
        },
        {
          label: '3D Secure',
          value: '3d-secure',
          img: '/img/bank_icon.png',
        },
        {
          label: 'Bank Accounts',
          value: 'bank-accounts',
          img: '/img/bank_icon.png',
        },
        {
          label: 'Nominal Amount',
          value: 'nominal-amount',
          img: '/img/bank_icon.png',
        },
      ]
    },
  },
  methods: {
    onMethodsChange(value) {
      const methods = this.form.paymentMethods
      const valueIndex = methods.indexOf(value)

      if (valueIndex >= 0) {
        methods.splice(valueIndex, 1)
      } else {
        methods.push(value)
      }
    },
  },
}
</script>

<template>
  <main-layout title="Payment Settings">
    <el-card>
      <el-row
        slot="header"
        type="flex"
        justify="space-between"
        align="middle"
      >
        <span>Settlment Account Details</span>

        <el-row type="flex">
          <el-button
            class="wide-button"
            type="primary"
            size="small"
          >
            Edit
          </el-button>
        </el-row>
      </el-row>
      <div class="card-subheader">
        All funds and charges will be setled into the following account
      </div>

      <el-form
        :model="form"
        :rules="rules"
        class="card-form"
      >
        <el-form-item
          label="AccountName"
          prop="accountName"
        >
          <el-input
            v-model="form.accountName"
            placeholder="Professionals Australia"
          />
        </el-form-item>

        <el-form-item
          label="BSB"
          prop="bsb"
        >
          <el-input
            v-model="form.bsb"
            placeholder="Professionals Australia"
          />
        </el-form-item>

        <el-form-item
          label="Account"
          prop="account"
        >
          <el-input
            v-model="form.account"
            placeholder="Professionals Australia"
          />
        </el-form-item>

        <el-form-item
          label="Statement Descriptor"
          prop="statementDescriptor"
          suffix-icon="el-icon-warning"
        >
          <el-input
            v-model="form.statementDescriptor"
            placeholder="Professionals Australia"
          />
        </el-form-item>
      </el-form>
    </el-card>

    <el-card :class="$style.card">
      <span slot="header">
        Payment Methods & Security
      </span>

      <div :class="$style.methods">
        <div
          v-for="(method, idx) in paymentMethods"
          :key="idx"
          :class="$style.switch"
          @click="onMethodsChange(method.value)"
        >
          <el-switch
            :value="form.paymentMethods.indexOf(method.value) >= 0"
          />
          <div
            :class="$style.switchImgWrapper"
          >
            <img
              :src="method.img"
              alt=""
              :class="$style.switchImg"
            >
          </div>
          <span :class="$style.switchLabel">
            {{ method.label }}
          </span>
        </div>
      </div>
    </el-card>

    <el-card>
      <span slot="header">
        Recurring Payment Retry Rules
      </span>

      <div :class="$style.rulesDesc">
        <span>Custom dunning rules</span>
        <span :class="$style.rulesSubheader">
          Manually configure steps to follow to retry
          payments until they succeed
        </span>
      </div>

      <div>
        <el-form
          :model="paymentSettings.rules"
          :class="[$style.recurring, 'card-form']"
        >
          <div :class="$style.rulesTitle">
            <div :class="$style.rulesIcon">
              <img src="~/assets/images/credit_card_icon.png">
            </div>
            <span :class="$style.rulesName">
              Credit / Debit Cards
            </span>
          </div>

          <el-form-item label="First retry attempt">
            <el-select
              v-model="paymentSettings.rules.cards.firstRetry"
            >
              <el-option
                v-for="(option,index) in formRulesAttemptsOptions"
                :key="index"
                :label="option.label"
                :value="option.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="Second retry attempt">
            <el-select
              v-model="paymentSettings.rules.cards.secondRetry"
            >
              <el-option
                v-for="(option,index) in formRulesAttemptsOptions"
                :key="index"
                :label="option.label"
                :value="option.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item
            :class="$style.lastFormItem"
            label="Action"
          >
            <el-select
              v-model="paymentSettings.rules.cards.action"
            >
              <el-option
                v-for="(option,index) in formRulesActionOptions"
                :key="index"
                :label="option.label"
                :value="option.value"
              />
            </el-select>
          </el-form-item>

          <div :class="$style.rulesTitle">
            <div :class="$style.rulesIcon">
              <img src="~/assets/images/credit_card_icon.png">
            </div>
            <span :class="$style.rulesName">
              Bank Accounts
            </span>
          </div>

          <el-form-item label="First retry attempt">
            <el-select
              v-model="paymentSettings.rules.accounts.firstRetry"
            >
              <el-option
                v-for="(option,index) in formRulesAttemptsOptions"
                :key="index"
                :label="option.label"
                :value="option.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="Second retry attempt">
            <el-select
              v-model="paymentSettings.rules.accounts.secondRetry"
            >
              <el-option
                v-for="(option,index) in formRulesAttemptsOptions"
                :key="index"
                :label="option.label"
                :value="option.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="Action">
            <el-select
              v-model="paymentSettings.rules.accounts.action"
            >
              <el-option
                v-for="(option,index) in formRulesActionOptions"
                :key="index"
                :label="option.label"
                :value="option.value"
              />
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </main-layout>
</template>

<style lang="scss" module>

.card {
  margin: 2rem 0;
}

.methods {
  display: flex;
  flex-wrap: wrap;
  max-width: 30rem;
}

.switch {
  display: flex;
  align-items: center;
  width: 50%;
  margin-bottom: 1.5rem;
}

.switchImgWrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4.4rem;
  height: 1.4rem;
  padding: 0 1.2rem;
  cursor: pointer;
}

.switchImg{
  display: block;
  max-width: 100%;
  max-height: 100%;
}

.switchLabel {
  cursor: pointer;
}

.recurring {
  max-width: 40rem;

  div:last-child {
    margin-bottom: 0;
  }
}

.rulesDesc {
  display: flex;
  flex-direction: column;
}

.rulesSubheader {
  margin-top: 0.8rem;
  font-size: 0.9rem;
  color: #bdbdbd;
}

.rulesTitle {
  display: flex;
  align-items: center;
  margin: 2rem 0 1rem 0;
}

.rulesIcon {
  width: 2rem;
  margin-right: 1rem;

  img {
    width: 100%;
  }
}

.rulesName {
  font-weight: 700;
}

</style>
