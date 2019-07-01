<script>
export default {
  name: 'PaymentMethodDetails',
  props: {
    payment: {
      type: Object,
      default: () => {},
    },
    token: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      mockData: {
        cardHolderName: 'John Doe',
        paymentMethod: '**** 2941',
        paymentSystem: 'mastercard',
      },
    }
  },
}
</script>
      <!-- TODO: Waiting for the team to respond about source of this information -->
<template>
  <div class="info-block">
    <span class="info-block__title">
      Payment Details
    </span>
    <dl class="datalist">
      <dt>Card Holder Name</dt>
      <dd>{{ mockData.cardHolderName }}</dd>

      <dt>Payment Method</dt>
      <dd>
        <div class="info-block__pay-method">
          {{ mockData.paymentMethod }}
          <div class="info-block__pay-logo">
            <img
              :src="`/img/${mockData.paymentSystem}_logo.png`"
              :alt="mockData.paymentSystem"
              class="info-block__pay-img"
            >
          </div>
        </div>
      </dd>

      <dt v-if="token">
        Token
      </dt>
      <dd>{{ mockData.token }}</dd>
    </dl>
  </div>
</template>
