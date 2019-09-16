<script>
import { mapActions } from 'vuex'
import get from 'lodash/get'
import capitalize from 'lodash/capitalize'
import { formatDate } from '@lib/utils/format-date'
import offerCanActivate from '../../../utils/offer-can-activate'

export default {
  name: 'FeedOffer',
  data() {
    return {
      loading: true,
      offer: {},
      progress: false,
    }
  },
  computed: {
    normalizedValues() {
      return get(this.offer, 'map') || {}
    },
    feedMerchant() {
      return get(this.offer, 'feed_merchant.map') || {}
    },
    advertiserName() {
      return get(this.offer, 'payload.advertisername')
    },
    activated() {
      return !!this.offer.offer_id
    },
    canActivate() {
      return !this.activated && offerCanActivate(this.offer)
    },
    back() {
      return {
        name: 'feed-update',
        params: {
          slug: this.$attrs.slug,
          tab: 'offers',
        },
      }
    },
  },
  async created() {
    await this.fetchFeedOffer()
  },
  methods: {
    ...mapActions('offers', ['getGlobalOffer', 'createGlobalOffer']),
    ...mapActions('feedOffers', ['getFeedOffer', 'activateFeedOffer']),
    capitalize,
    async fetchFeedOffer() {
      const [, result] = await this.getFeedOffer(this.$attrs.id)
      if (result) {
        this.loading = false
        this.offer = result
      }
    },
    activate() {
      this.progress = true

      return Promise.all([
        this.createGlobalOffer({
          feed_offer: this.offer.external_id,
          name: this.advertiserName,
        }),
        this.activateFeedOffer({
          feedOfferId: this.offer.id,
          payload: {
            acknowledgement: 'acknowledged',
          },
        }),
      ])
        .then(this.fetchFeedOffer)
        .then(() => {
          this.progress = false
          this.$notify({
            type: 'success',
            title: 'Success',
            message: 'Successfully activated',
          })
        })
    },
    formatDate(value, format) {
      return formatDate(value, format || 'DD/MM/YYYY', false)
    },
  },
}
</script>

<template>
  <main-layout
    :title="normalizedValues.name"
    :back="back"
    :loading="loading"
  >
    <el-card>
      <div
        slot="header"
        :class="$style.header"
      >
        <span>
          General Information
        </span>
        <el-button
          v-if="canActivate"
          :loading="progress"
          type="primary"
          class="el-button--wide"
          @click="activate"
        >
          Activate
        </el-button>
      </div>
      <div>
        <dl :class="['datalist', $style.list]">
          <dt>Offer Aggregator</dt>
          <dd>{{ capitalize(offer.feed) || '—' }}</dd>
          <dt>Offer Ext ID</dt>
          <dd>{{ offer.external_id || '—' }}</dd>
          <dt>Offer Created at</dt>
          <dd>
            {{ formatDate(offer.created_at, 'DD/MM/YYYY hh:mm A') || '—' }}
          </dd>
          <dt>Offer Updated</dt>
          <dd>
            {{ formatDate(offer.updated_at, 'DD/MM/YYYY hh:mm A') || '—' }}
          </dd>
          <dt>Merchant Name</dt>

          <dd>{{ feedMerchant.name || '—' }}</dd>
          <dt>Offer Name</dt>
          <dd>{{ normalizedValues.name || '—' }}</dd>
          <dt>Coupon Code</dt>
          <dd>{{ normalizedValues.code || '—' }}</dd>
          <dt>Offer Starts</dt>
          <dd>{{ formatDate(normalizedValues.start_date) || '—' }}</dd>
          <dt>Offer Ends</dt>
          <dd>{{ formatDate(normalizedValues.end_date) || '—' }}</dd>
          <dt>Description</dt>
          <dd>{{ normalizedValues.description || '—' }}</dd>
          <dt>Terms & Conditions</dt>
          <dd>{{ normalizedValues.terms || '—' }}</dd>
        </dl>
      </div>
    </el-card>
  </main-layout>
</template>

<style lang="scss" module>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.list {
  flex: 1 0 50%;

  dt {
    color: black;
  }

  h2,
  h3,
  h4,
  h5,
  h6 {
    padding: 0;
    margin: 0 0 1rem;
    font-size: 1rem;
  }
}
</style>
