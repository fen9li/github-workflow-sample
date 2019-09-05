<script>
import RetailerOffer from './retailer-offer'

export default {
  name: 'OffersPreview',
  components: {
    RetailerOffer,
  },
  props: {
    retailer: {
      type: Object,
      default: () => ({}),
    }
  },
}
</script>

<template>
  <div :class="$style.offersPreview">
    <div :class="$style.leftSide">
      <div
        v-if="retailer.logo"
        :class="$style.logoWrapper"
      >
        <img
          :src="retailer.logo"
          :alt="retailer.retailer_name"
        >
      </div>
      <a
        :href="retailer.website"
        :class="$style.website"
      >
        <b>{{ retailer.website }}</b>
      </a>
      <div :class="$style.description">
        {{ retailer.description }}
      </div>
    </div>

    <div :class="$style.rightSide">
      <div :class="$style.title">
        {{ retailer.retailer_name }}
      </div>

      <div
        v-for="(offer, index) in retailer.offers"
        :key="index"
      >
        <hr :class="['divider-primary', $style.divider]">
        <retailer-offer :offer="offer" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" module>
  .divider {
    margin: 2rem 0;
  }

  .offersPreview {
    display: flex;
    width: 100%;
    line-height: 1.2rem;
  }

  .leftSide {
    max-width: rem(230px);
  }

  .rightSide {
    width: 100%;
    margin-left: rem(60px);
  }

  .logoWrapper {
    width: rem(230px);
    height: rem(230px);
    margin-bottom: rem(20px);
    overflow: hidden;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

    img {
      width: 100%;
      height: auto;
      object-fit: cover;
    }
  }

  .website {
    display: inline-block;
    margin-bottom: rem(20px);
    font-size: rem(13px);
    text-decoration: underline;
  }

  .description {
    font-size: rem(13px);
    line-height: 1rem;
  }

  .title {
    font-size: 1.4rem;
    font-weight: 600;
    line-height: rem(30px);
  }
</style>
