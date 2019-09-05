<script>
export default {
  name: 'OfferShowSave',
  props: {
    offer: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },
}
</script>

<template>
  <div :class="$style.logo">
    <img
      :src="offer.logo"
      :alt="offer.offer_name"
    >
  </div>
</template>

<style lang="scss" module>
  .logo {
    width: 100%;

    img {
      width: 100%;
      max-width: 360px;
      max-height: 360px;
      object-fit: cover;
    }
  }
</style>
