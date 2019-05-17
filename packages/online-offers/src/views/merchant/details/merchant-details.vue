<script>
import { formatDate } from '@lib/utils/format-date'
import capitalize from 'lodash/capitalize'
import formatDollar from '@lib/utils/format-dollar'

export default {
  name: 'MerchantDetails',
  props: {
    details: {
      type: Object,
      required: true,
    },
  },
  methods: {
    capitalize,
    formatDollar,
    formatDate(value) {
      return formatDate(value, 'DD/MM/YYYY hh:mm A')
    },
  },
}
</script>

<template>
  <div :class="$style.wrapper">
    <div :class="$style.logo">
      <div :class="$style.imageWrapper">
        <img
          src="https://picsum.photos/id/366/500/500"
          alt="Merchant name"
          :class="$style.image"
        >
      </div>
      <div :class="$style.statusWrapper">
        <span :class="$style.status">Status</span>
        <el-switch
          v-model="details.status"
          active-value="active"
        />
      </div>
    </div>
    <div :class="$style.details">
      <dl :class="['datalist datalist__online-offers', {[$style.inactive]: details.status !== 'active'}]">
        <dt :class="$style.grey">
          Merchant ID
        </dt>
        <dd :class="$style.grey">
          {{ details.id }}
        </dd>
        <dt :class="$style.grey">
          Merchant Ext ID
        </dt>
        <dd :class="$style.grey">
          {{ details.extId }}
        </dd>
        <dt :class="$style.grey">
          Merchant Updated
        </dt>
        <dd :class="$style.grey">
          {{ `${formatDate(details.updated) } by ${details.updatedBy}` }}
        </dd>
        <dt>Merchant Name</dt>
        <dd>{{ details.name }}</dd>
        <dt>Commission Aggregator</dt>
        <dd>{{ details.feed }}</dd>
        <dt>Commission Type</dt>
        <dd>{{ capitalize(details.commissionType) }}</dd>
        <dt>Commission Rate</dt>
        <dd :class="$style.rates">
          <span>{{ `Base ${formatDollar(details.commissionRates.base)}` }}</span>
          <span>{{ `Min ${formatDollar(details.commissionRates.min)}` }}</span>
          <span>{{ `Max ${formatDollar(details.commissionRates.max)}` }}</span>
        </dd>
        <dt>Classifications</dt>
        <dd :class="$style.classifications">
          <span
            v-for="(item, index) in details.classifications"
            :key="index"
          >
            {{ capitalize(item) }}
          </span>
        </dd>
        <dt>Summary</dt>
        <dd>{{ details.summary }}</dd>
        <dt>Merchant Website</dt>
        <dd>{{ details.website }}</dd>
        <dt>Terms & Conditions</dt>
        <dd>{{ details.terms }}</dd>
      </dl>
    </div>
    <div>
      <el-button
        type="primary"
        class="wide-button"
        @click="$emit('editMerchant')"
      >
        Edit Merchant Details
      </el-button>
    </div>
  </div>
</template>

<style lang="scss" module>
.wrapper {
  display: flex;
}

.imageWrapper {
  width: 12rem;
  height: 12rem;
  overflow: hidden;
  box-shadow: 0 0 15px -5px rgba(0,0,0,0.75);
}

.image {
  width: 100%;
  height: auto;
}

.statusWrapper {
  margin-top: 2rem;
}

.status {
  padding-right: 1.5rem;
}

.details {
  width: 100%;
  padding: 0 3rem;
}

.rates {
  span {
    padding-right: 2.5rem;
  }
}

.grey {
  color: gray;
}

.inactive {
  opacity: .6;
}
</style>
