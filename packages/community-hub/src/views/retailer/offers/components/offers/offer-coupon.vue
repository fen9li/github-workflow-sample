<script>
export default {
  name: 'OfferCoupon',
  props: {
    offer: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },
  computed: {
    onlineCheckout() {
      return this.offer.offer_url &&
        (this.offer.coupon_code_use === 'online only' || this.offer.coupon_code_use === 'online and in-store')
    }
  }
}
</script>

<template>
  <div>
    <div
      v-if="offer.coupon_code"
      :class="$style.code"
    >
      {{ offer.coupon_code }}
    </div>
    <div v-if="onlineCheckout">
      Use the code above at
      <a
        :href="offer.offer_url"
        target="_blank"
        rel="noopener"
      >
        {{ offer.offer_url }}
      </a>
      for online checkout.
    </div>
  </div>
</template>

<style lang="scss" module>
  .code {
    display: inline-block;
    padding: 10px;
    margin-bottom: rem(20px);
    font-size: rem(24px);
    font-weight: 600;
    border: .15rem dashed var(--color-dark-gray);
    border-radius: 3px;
  }
</style>
