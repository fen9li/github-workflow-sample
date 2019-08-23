<script>
import formatAccount from '@lib/utils/format-account'
import { mapActions } from 'vuex'

export default {
  name: 'PaymentMethodDetails',
  props: {
    paymentSource: {
      type: Object,
      default: () => {},
    },
    token: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      paymentSystem: ''
    }
  },
  computed: {
    logo() {
      const { type } = this.paymentSource
      const { paymentSystem } = this

      const logoObj = {
        url: '',
        alt: type,
      }

      if(type === 'bank_account') {
        logoObj.img = `/img/bank_icon.png`
      } else if (type === 'credit_card') {
        logoObj.img = `/img/${paymentSystem}_logo.png`
      }

      return logoObj
    },
    payerName() {
      const { paymentSource } = this

      return paymentSource ? paymentSource.name || paymentSource.metadata.find(item => item.key === 'name').value : null
    }
  },
  created() {
    const { paymentSource } = this
    if(paymentSource && paymentSource.type === 'credit_card') {
      this.getCardType({ token: paymentSource.token || this.token, number: paymentSource.pan }).then(resp => {
        this.paymentSystem = resp
      })
    }
  },
  methods: {
    ...mapActions('payment', ['getCardType']),
    formatAccount(value) {
      return formatAccount(value, 4)
    },
  },
}
</script>
<template>
  <div
    class="info-block"
  >
    <span class="info-block__title">
      Payment Details {{ paymentSystem }}
    </span>
    <dl
      v-if="paymentSource"
      class="datalist"
    >
      <dt>Card Holder Name</dt>
      <dd>{{ payerName }}</dd>

      <dt>Payment Method</dt>
      <dd>
        <div class="info-block__pay-method">
          {{ formatAccount(paymentSource.pan) }}
          <div class="info-block__pay-logo">
            <img
              :src="logo.img"
              :alt="logo.alt"
              class="info-block__pay-img"
            >
          </div>
        </div>
      </dd>

      <template v-if="token">
        <dt>Token</dt>
        <dd>{{ token }}</dd>
      </template>
    </dl>

    <span
      v-else
      class="info-block__empty"
    > No payment details provided </span>
  </div>
</template>
