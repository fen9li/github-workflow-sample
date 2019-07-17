<script>
import { mapActions } from 'vuex'
import { formatDate } from '@lib/utils/format-date'
import capitalize from 'lodash/capitalize'
import formatDollar from '@lib/utils/format-dollar'

export default {
  name: 'MerchantOfferDetails',
  props: {
    details: {
      type: Object,
      required: true,
    },
  },
  methods: {
    ...mapActions('offers', ['updateGlobalOffer']),
    capitalize,
    formatDollar,
    formatDate(value, format) {
      return formatDate(value, format || 'DD/MM/YYYY hh:mm A')
    },
    editOffer() {
      this.$emit('editOffer')
    },
    async onSwitch() {
      this.updateGlobalOffer({
        id: this.details.id,
        payload: {
          enabled: !this.details.enabled,
        },
      }).then(() => {
        this.$notify({
          type: 'success',
          title: 'Success',
          message: `Status successfully changed to ${this.details.enabled ? 'enabled' : 'disabled'}`,
        })
      })
    },
  },
}
</script>

<template>
  <el-card>
    <div
      slot="header"
      :class="$style.header"
    >
      <span>
        General Information
      </span>
      <el-button
        type="primary"
        icon="el-icon-edit"
        circle
        @click="editOffer"
      />
    </div>

    <div @click="onSwitch">
      <el-switch
        v-model="details.enabled"
        active-text="Active"
      />
    </div>

    <div>
      <dl :class="['datalist datalist__online-offers', $style.list]">
        <dt :class="$style.grey">
          Offer Associated Aggregator
        </dt>
        <dd :class="$style.grey">
          {{ details.feed_offer.map.feed || '—' }}
        </dd>
        <dt :class="$style.grey">
          Offer ID
        </dt>
        <dd :class="$style.grey">
          {{ details.id || '—' }}
        </dd>
        <dt :class="$style.grey">
          Offer Ext ID
        </dt>
        <dd :class="$style.grey">
          {{ details.feed_offer.external_id || '—' }}
        </dd>
        <dt :class="$style.grey">
          Offer Created
        </dt>
        <dd :class="$style.grey">
          {{ formatDate(details.created_at) || '—' }}
        </dd>
        <dt :class="$style.grey">
          Offer Updated
        </dt>
        <dd :class="$style.grey">
          {{ `${formatDate(details.updated_at) || '—' }` }}
        </dd>
        <dt>
          Coupon Code
        </dt>
        <dd>
          {{ details.feed_offer.map.coupon || '—' }}
        </dd>
        <dt>
          Offer Starts
        </dt>
        <dd>
          {{ formatDate(details.feed_offer.map.start_date) || '—' }}
        </dd>
        <dt>
          Offer Ends
        </dt>
        <dd>
          {{ formatDate(details.feed_offer.map.end_date) || '—' }}
        </dd>
        <dt>
          Description
        </dt>
        <dd>
          {{ details.feed_offer.map.description || '—' }}
        </dd>
        <dt>
          Terms & Conditions
        </dt>
        <dd>
          {{ details.terms || '—' }}
        </dd>
        <dt>
          Offer URL
        </dt>
        <dd>
          {{ details.feed_offer.map.url || '—' }}
        </dd>
      </dl>
    </div>
  </el-card>
</template>

<style lang="scss" module>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.wrapper {
  display: flex;
  justify-content: space-between
}

.grey {
  color: gray;
}

.title {
  display: block;
  margin-bottom: 1.8rem;
  font-size: 1.5rem;
}

.list {
  flex: 1 0 50%;
  max-width: 1000px;
  margin-top: 1.8rem;

  dt {
    color: black;
  }

  dt:not(:first-of-type),
  dd:not(:first-of-type) {
    padding-top: 1rem;
  }

  h2, h3, h4, h5, h6 {
    padding: 0;
    margin: 0 0 1rem;
    font-size: 1rem;
  }
}

.editBtn {
  margin-top: 2rem;
}
</style>
