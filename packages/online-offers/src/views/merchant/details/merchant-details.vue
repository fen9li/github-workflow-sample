<script>
import get from 'lodash/get'
import { mapActions } from 'vuex'
import { formatDate } from '@lib/utils/format-date'
import capitalize from 'lodash/capitalize'
import formatCommission from '@lib/utils/format-commission'

export default {
  name: 'MerchantDetails',
  props: {
    merchant: {
      type: Object,
      required: true,
    },
    feed: {
      type: Object,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    original: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    commission() {
      const commission = get(this.feed, 'map.commission', {})
      return formatCommission(commission) || {}
    },
    categories() {
      const categories = this.merchant

      if (categories && categories.length) {
        return categories.map(this.capitalize).join(', ')
      }

      return '–'
    },
  },
  methods: {
    capitalize,
    formatCommission,
    ...mapActions('merchants', ['updateGlobalMerchant']),
    formatDate(value) {
      return formatDate(value, 'DD/MM/YYYY hh:mm A')
    },
    async onSwitch(event) {
      this.merchant.enabled = !this.merchant.enabled
      await this.$nextTick()
      this.updateGlobalMerchant({
        merchantId: this.merchant.id,
        payload: {
          enabled: this.merchant.enabled,
        },
      }).then(() => {
        this.$notify({
          type: 'success',
          title: 'Success',
          message: `Merchant status successfully changed`,
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
            v-if="merchant.logo"
            :src="merchant.logo"
            :alt="merchant.name"
            :class="$style.image"
          >
        </div>
        <div :class="$style.statusWrapper">
          <el-switch
            :value="merchant.enabled"
            active-text="Active"
            :disabled="disabled"
            @change="onSwitch"
          />
        </div>
      </div>
      <div :class="$style.details">
        <dl
          :class="[
            'datalist',
            $style.datalist,
            !merchant.enabled && $style.inactive,
          ]"
        >
          <dt>Merchant ID</dt>
          <dd>{{ merchant.id }}</dd>
          <dt>Merchant Ext ID</dt>
          <dd>{{ merchant.external_id || '–' }}</dd>
          <dt>Merchant Updated</dt>
          <dd>{{ formatDate(merchant.updated_at) }}</dd>
          <dt>Merchant Name</dt>
          <dd>{{ merchant.name }}</dd>
          <dt>Commission Aggregator</dt>
          <dd>{{ feed.feed }}</dd>
          <dt>Commission Type</dt>
          <dd>{{ commission.type || '–' }}</dd>
          <template v-if="commission">
            <dt>Commission Rate</dt>
            <dd>
              <span :class="$style.rate">
                {{ commission.base }}
              </span>
              <span :class="$style.rate">
                {{ commission.min }}
              </span>
              <span :class="$style.rate">
                {{ commission.max }}
              </span>
            </dd>
          </template>
          <dt>Classifications</dt>
          <dd :class="$style.classifications">
            {{ categories }}
          </dd>
          <dt>Summary</dt>
          <dd>{{ merchant.summary }}</dd>
          <dt>Merchant Website</dt>
          <dd>{{ merchant.website }}</dd>
          <dt>Terms & Conditions</dt>
          <dd
            v-if="merchant.terms"
            v-html="merchant.terms"
          />
          <dd v-else>
            –
          </dd>
        </dl>
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
  overflow: hidden;
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

.datalist {
  display: grid;
  flex: 1 0 50%;
  grid-template-columns: auto 1fr;
  grid-column-gap: rem(20px);
  margin-top: 1.8rem;

  dd {
    font-weight: bold;
  }

  dt {
    min-width: auto;
  }
}

.details {
  width: 100%;
  padding-left: 3rem;

  dd {
    font-weight: bold;
  }
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

.inactive {
  opacity: 0.6;
}
</style>
