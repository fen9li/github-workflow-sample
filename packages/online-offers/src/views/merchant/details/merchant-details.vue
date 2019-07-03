<script>
import { mapActions } from 'vuex'
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
    original: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    merchantId() {
      return this.$route.params.id
    },
  },
  methods: {
    capitalize,
    formatDollar,
    ...mapActions('merchants', [
      'updateMerchant',
    ]),
    formatDate(value) {
      return formatDate(value, 'DD/MM/YYYY hh:mm A')
    },
    async onSwitch(event) {
      this.details.enabled = !this.details.enabled
      await this.$nextTick()
      this.updateMerchant({
        merchantId: this.merchantId,
        payload: {
          enabled: this.details.enabled,
        },
      }).then(() => {
        this.$notify({
          type: 'success',
          title: 'Success',
          message: `Merchant status sussessfully changed`,
        })
      })
    },
  },
}
</script>

<template>
  <div :class="$style.wrapper">
    <div :class="$style.innerWrapper">
      <div :class="$style.logo">
        <div :class="$style.imageWrapper">
          <img
            v-if="details.logo"
            src="details.logo"
            alt="details.map.name"
            :class="$style.image"
          >
        </div>
        <div
          :class="$style.statusWrapper"
        >
          <span :class="$style.status">Status</span>
          <el-switch
            :value="details.enabled"
            @change="onSwitch"
          />
        </div>
      </div>
      <div :class="$style.details">
        <dl
          :class="[
            'datalist datalist__online-offers',
            !details.enabled && $style.inactive
          ]"
        >
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
            {{ details.external_id }}
          </dd>
          <dt :class="$style.grey">
            Merchant Updated
          </dt>
          <dd :class="$style.grey">
            {{ formatDate(details.updated_at) }}
          </dd>
          <dt>Merchant Name</dt>
          <dd>{{ details.map.name }}</dd>
          <dt>Commission Aggregator</dt>
          <dd>{{ details.feed }}</dd>
          <dt>Commission Type</dt>
          <dd>{{ capitalize(details.map.commission.type) }}</dd>
          <dt>Commission Rate</dt>
          <dd>
            <span :class="$style.rate">
              {{ `Base ${formatDollar(details.map.commission.base)}` }}
            </span>
            <span :class="$style.rate">
              {{ `Min ${formatDollar(details.map.commission.min)}` }}
            </span>
            <span :class="$style.rate">
              {{ `Max ${formatDollar(details.map.commission.max)}` }}
            </span>
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
          <dd>{{ details.map.summary }}</dd>
          <dt>Merchant Website</dt>
          <dd>{{ details.map.website }}</dd>
          <dt>Terms & Conditions</dt>
          <dd v-html="details.map.terms" />
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
  </div>
</template>

<style lang="scss" module>
.innerWrapper {
  display: flex;
}

.title {
  margin-bottom: 1.5rem;
  font-size: 1.25rem;
  color: var(--color-text);
}

.imageWrapper {
  width: 12rem;
  height: 12rem;
  overflow: hidden;
  box-shadow: 0 0 15px -5px rgba(0,0,0,0.75);
}

.imageWrapperSm {
  width: 8rem;
  height: 8rem;
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
  padding-left: 3rem;
}

.rate {
  padding-right: 0.5rem;

  @media screen and (max-width: 1280px) {
    display: block;
  }

  @media screen and (min-width: 1280px) {
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
