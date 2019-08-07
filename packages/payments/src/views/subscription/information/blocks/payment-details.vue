<script>
import formatAccount from '@lib/utils/format-account'

export default {
  name: 'PaymentMethodDetails',
  props: {
    paymentSource: {
      type: Object,
      default: () => {},
    },
    token: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    logo() {
      const { type } = this.paymentSource

      const logoObj = {
        url: '',
        alt: type,
      }

      if(type === 'bank_account') {
        logoObj.img =  `/img/bank_icon.png`
      } else if (type === 'credit_card') {
        logoObj.img =  `/img/mastercard_logo.png`
      }

      return logoObj
    }
  },
  methods: {
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
      Payment Details
    </span>
    <dl
      v-if="paymentSource"
      class="datalist"
    >
      <dt>Card Holder Name</dt>
      <dd>{{ paymentSource.name }}</dd>

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
        <dd>{{ paymentSource.token }}</dd>
      </template>
    </dl>

    <span
      v-else
      class="info-block__empty"
    > No payment details provided </span>
  </div>
</template>
