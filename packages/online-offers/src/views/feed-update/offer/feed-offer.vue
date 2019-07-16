<script>
import { mapActions } from 'vuex'
import get from 'lodash/get'
import capitalize from 'lodash/capitalize'
import { formatDate } from '@lib/utils/format-date'

export default {
  name: 'FeedOffer',
  data() {
    return {
      loading: true,
      offer: {},
    }
  },
  computed: {
    map() {
      return get(this.offer, 'map') || {}
    },
    advertiserName() {
      return get(this.offer, 'payload.advertisername')
    },
    activated() {
      return !!this.offer.offer_id
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
    this.loading = false
  },
  methods: {
    ...mapActions('offers', [
      'createOffer',
    ]),
    ...mapActions('feedOffers', [
      'getFeedOffer',
      'activateFeedOffer',
    ]),
    capitalize,
    async fetchFeedOffer() {
      const [, result] = await this.getFeedOffer(this.$attrs.id)
      if (result) {
        this.offer = result
      }
    },
    async activate() {
      await this.createOffer({
        feed_offer: this.offer.external_id,
        name: this.advertiserName,
      })
      await this.activateFeedOffer({
        feedOfferId: this.offer.id,
        payload: {
          acknowledgement: 'acknowledged',
        },
      })
      this.getOffer().then(() => this.$notify({
        type: 'success',
        title: 'Success',
        message: 'Successfuly activated',
      }))
    },
    formatDate(value, format) {
      return formatDate(value, format || 'DD/MM/YYYY', false)
    },
  },
}
</script>

<template>
  <main-layout
    :title="map.name"
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
          v-if="!activated"
          type="primary"
          class="el-button--wide"
          @click="activate"
        >
          Activate
        </el-button>
      </div>
      <div>
        <dl :class="['datalist', $style.list]">
          <dt>Offer Associated Aggreg</dt>
          <dd>{{ capitalize(offer.feed) || '-' }}</dd>
          <dt>Offer Ext ID</dt>
          <dd>{{ offer.external_id || '-' }}</dd>
          <dt>Offer Created at</dt>
          <dd>
            {{ formatDate(offer.created_at, 'DD/MM/YYYY hh:mm A') || '-' }}
          </dd>
          <dt>Offer Updated</dt>
          <dd>
            {{ formatDate(offer.updated_at, 'DD/MM/YYYY hh:mm A') || '-' }}
          </dd>
          <dt>Offer Name</dt>
          <dd>{{ map.name || '-' }}</dd>
          <dt>Coupon Code</dt>
          <dd>{{ map.code || '-' }}</dd>
          <dt>Offer Starts</dt>
          <dd>{{ formatDate(map.start_date) || '-' }}</dd>
          <dt>Offer Ends</dt>
          <dd>{{ formatDate(map.end_date) || '-' }}</dd>
          <dt>Description</dt>
          <dd>{{ map.description || '-' }}</dd>
          <dt>Terms & Conditions</dt>
          <dd>{{ map.terms || '-' }}</dd>
          <dt>Offer Tracking URL</dt>
          <dd>{{ map.tracking_url || '-' }}</dd>
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
