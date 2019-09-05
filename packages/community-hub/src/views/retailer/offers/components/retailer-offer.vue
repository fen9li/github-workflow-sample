<script>
import { formatDate } from '@lib/utils/format-date'
import PreviewModal from './preview-modal'
import OfferCoupon from './offers/offer-coupon'
import OfferShowSave from './offers/offer-show-save'

export default {
  name: 'RetailerOffer',
  components: {
    PreviewModal,
    OfferCoupon,
    OfferShowSave
  },
  props: {
    offer: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      termsVisible: false,
      offerVisible: false,
    }
  },
  computed: {
    isOfferTypeUrl() {
      return this.offer.offer_type === 'URL'
    },
    offerComponent() {
      switch (this.offer.offer_type) {
        case 'Show and Save':
          return {
            name: 'offer-show-save',
            title: 'Show and Save',
            fullBody: true,
          }
        case 'Coupon Code':
          return {
            name: 'offer-coupon',
            title: 'Coupon Code',
            fullBody: false,
          }
        default:
          return null
      }
    }
  },
  methods: {
    formatDate(value) {
      return formatDate(value, 'DD MMMM YYYY')
    },
    redeemOffer() {
      if (!this.isOfferTypeUrl) {
        this.offerVisible = true
      } else {
        window.open(this.offer.url, '_blank', 'noopener')
      }
    },
    isOfferHasLocation(locations) {
      return locations.filter(value => value).length > 0
    },
  }
}
</script>

<template>
  <div>
    <div><b>{{ offer.offer_name || 'Offer Name' }}</b></div>
    <div :class="$style.desctiption">
      {{ offer.description || 'Offer Description' }}
    </div>

    <div
      v-if="isOfferHasLocation(offer.locations)"
      :class="$style.locations"
    >
      <div>Participating locations:</div>
      <div
        v-for="(location, idx) in offer.locations"
        :key="idx"
      >
        {{ location }}
      </div>
    </div>

    <div
      v-if="offer.end_at"
      :class="$style.offerEnds"
    >
      Ends {{ formatDate(offer.end_at) }}
    </div>

    <div :class="$style.footer">
      <div
        v-if="offer.terms"
        :class="$style.terms"
        @click="termsVisible = true"
      >
        <b>View Offer Terms</b>
      </div>
      <div>
        <el-button
          type="primary"
          size="small"
          @click="redeemOffer"
        >
          Redeem
        </el-button>
      </div>
    </div>

    <preview-modal
      title="Terms and Conditions"
      :visible.sync="termsVisible"
      modal-append-to-body
      append-to-body
    >
      <div>{{ offer.terms }}</div>
      <div slot="footer">
        <el-button
          type="primary"
          @click="termsVisible = false"
        >
          Got it
        </el-button>
      </div>
    </preview-modal>

    <preview-modal
      v-if="offerComponent"
      :title="offerComponent.title"
      :visible.sync="offerVisible"
      :full-body="offerComponent.fullBody"
    >
      <component
        :is="offerComponent.name"
        :offer="offer"
      />
    </preview-modal>
  </div>
</template>

<style lang="scss" module>
  .desctiption,
  .locations,
  .offerEnds {
    margin-top: rem(10px);
    font-size: rem(14px);
  }

  .locations, .offerEnds {
    line-height: 1.1rem;
    color: var(--color-dark-gray);
  }

  .footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: rem(10px);

    div:only-child {
      margin-left: auto;
    }
  }

  .terms {
    font-size: rem(14px);
    color: var(--color-link);
    text-decoration: underline;
    cursor: pointer;
  }
</style>
