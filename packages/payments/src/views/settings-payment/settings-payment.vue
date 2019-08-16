<script>
import appConfig from '~/app.config'

const paymentRules = {
  're_1': 'Retry next day after the previous failure',
  're_3': 'Retry 3 days after the previous failure',
  're_5': 'Retry 5 days after the previous failure',
  'cancel': 'Cancel the Subscription',
  'notify': 'Notify via email',
}

export default {
  name: 'PaymentSettings',
  page: {
    title: 'Payment Settings',
    meta: [{ name: 'description', content: appConfig.description }],
  },
  data() {
    return {
      settings: {
        account: {
          name: 'Professionals Australia',
          bsb: '078-8278',
          number: '2781999',
        },
        rules: {
          card: {
            first: 're_3',
            second: 're_5',
            action: 'cancel',
          },
          accounts: {
            first: 're_1',
            second: 're_3',
            action: 'notify',
          },
        },
      },
    }
  },
  computed: {
    retryRules() {
      const { rules } = this.settings
      return {
        card: {
          first: paymentRules[rules.card.first],
          second: paymentRules[rules.card.second],
          action: paymentRules[rules.card.action],
        },
        accounts: {
          first: paymentRules[rules.accounts.first],
          second: paymentRules[rules.accounts.second],
          action: paymentRules[rules.accounts.action],
        },
      }
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
      <div :class="$style.title">
        Settlement Account Details
      </div>

      <dl class="datalist">
        <dt>Account Name</dt>
        <dd>{{ settings.account.name }}</dd>

        <dt>BSB</dt>
        <dd>{{ settings.account.bsb }}</dd>

        <dt>Account No.</dt>
        <dd>{{ settings.account.number }}</dd>
      </dl>

      <hr :class="['divider-primary', $style.divider]">

      <div :class="$style.title">
        Recurring Payment Retry Rules
      </div>

      <span :class="$style.subtitle">Custom dunning rules</span>

      <div :class="$style.ruleTitle">
        <i :class="['el-icon-bank-card', $style.rulesIcon]" />
        <span>Credit/Debit Cards</span>
      </div>

      <dl class="datalist">
        <dt>First retry attempt</dt>
        <dd>{{ retryRules.card.first }}</dd>

        <dt>Second retry</dt>
        <dd>{{ retryRules.card.second }}</dd>

        <dt>Action</dt>
        <dd>{{ retryRules.card.action }}</dd>
      </dl>

      <div :class="$style.ruleTitle">
        <i :class="['el-icon-house', $style.rulesIcon]" />
        <span>Bank Accounts</span>
      </div>

      <dl class="datalist">
        <dt>First retry attempt</dt>
        <dd>{{ retryRules.accounts.first }}</dd>

        <dt>Second retry</dt>
        <dd>{{ retryRules.accounts.second }}</dd>

        <dt>Action</dt>
        <dd>{{ retryRules.accounts.action }}</dd>
      </dl>
    </el-card>
  </main-layout>
</template>

<style lang="scss" module>
.card {
  margin: 2rem 0;
}

.title {
  padding-bottom: 2rem;
  font-size: 1.4rem;
  font-weight: 600;
}

.subtitle {
  font-size: 1.2rem;
}

.ruleTitle {
  display: flex;
  align-items: center;
  padding: 1.7rem 0;
  font-size: 1.3rem;
}

.rulesIcon {
  margin-right: 1rem;
  font-size: 1.7rem;
  color: var(--color-primary);

  img {
    width: 100%;
  }
}

.divider {
  margin: 2.5rem 0;
}

</style>
