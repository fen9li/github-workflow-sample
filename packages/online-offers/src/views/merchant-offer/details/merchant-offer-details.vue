<script>
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
    capitalize,
    formatDollar,
    formatDate(value, format) {
      return formatDate(value, format || 'DD/MM/YYYY hh:mm A')
    },
    editOffer() {
      this.$emit('editOffer')
    },
  },
}
</script>

<template>
  <div
    :class="$style.wrapper"
  >
    <div>
      <span :class="$style.title">
        {{ details.name }}
      </span>
      <dl :class="['datalist datalist__online-offers', $style.dataList]">
        <dt :class="$style.grey">
          Offer Associated Aggregator
        </dt>
        <dd :class="$style.grey">
          {{ details.feed }}
        </dd>
        <dt :class="$style.grey">
          Offer ID
        </dt>
        <dd :class="$style.grey">
          {{ details.id }}
        </dd>
        <dt :class="$style.grey">
          Offer Ext ID
        </dt>
        <dd :class="$style.grey">
          {{ details.extId }}
        </dd>
        <dt :class="$style.grey">
          Offer Created
        </dt>
        <dd :class="$style.grey">
          {{ formatDate(details.created) }}
        </dd>
        <dt :class="$style.grey">
          Offer Updated
        </dt>
        <dd :class="$style.grey">
          {{ `${formatDate(details.updated) } by ${details.updatedBy}` }}
        </dd>
        <dt>Coupon Code</dt>
        <dd>{{ details.coupon }}</dd>
        <dt>Offer Starts</dt>
        <dd>{{ formatDate(details.offerStarts) }}</dd>
        <dt>Offer Ends</dt>
        <dd>{{ formatDate(details.offerEnds) }}</dd>
        <dt>Description</dt>
        <dd>{{ details.description }}</dd>
        <dt>Terms & Conditions</dt>
        <dd>{{ details.terms }}</dd>
        <dt>Offer URL</dt>
        <dd>{{ details.url }}</dd>
      </dl>
    </div>

    <div :class="$style.controls">
      <el-button
        type="success"
        class="wide-button"
      >
        Activate Offer
      </el-button>

      <div>
        <el-button
          type="primary"
          :class="['wide-button', $style.editBtn]"
          @click="editOffer"
        >
          Edit Offer Details
        </el-button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" module>
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

.dataList {
  max-width: 80%;
}

.editBtn {
  margin-top: 2rem;
}
</style>
