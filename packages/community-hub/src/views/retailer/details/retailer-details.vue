<script>
import { formatDate } from '@lib/utils/format-date'
import RetailerStatus from '../../retailers/retailer-status'

export default {
  name: 'RetailerDetails',
  components: {
    RetailerStatus,
  },
  props: {
    retailer: {
      type: Object,
      required: true,
    },
  },
  computed: {
    enabled() {
      return this.retailer.status === 'active'
    },
  },
  methods: {
    formatDate(value) {
      return formatDate(value, 'DD/MM/YYYY hh:mm A')
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
            v-if="retailer.logo"
            :src="retailer.logo"
            :alt="retailer.name"
            :class="$style.image"
          >
        </div>
      </div>
      <div :class="$style.details">
        <retailer-status :status="retailer.status" />
        <dl
          :class="[
            'datalist',
            $style.datalist,
            !enabled && $style.inactive,
          ]"
        >
          <dt>Last Updated</dt>
          <dd>{{ formatDate(retailer.updated_at) }} by {{ retailer.updated_with }}</dd>
          <dt>Retailer Name</dt>
          <dd>{{ retailer.retailer_name }}</dd>
          <dt>Description</dt>
          <dd>{{ retailer.description }}</dd>
          <dt>Retailer Website</dt>
          <dd>{{ retailer.website }}</dd>
        </dl>
      </div>
    </div>
  </div>
</template>

<style lang="scss" module>
.innerWrapper {
  display: flex;
}

.imageWrapper {
  width: rem(212px);
  height: rem(212px);
  overflow: hidden;
  box-shadow: 0 2px 14px 0 rgba(0,0,0,0.13);
}

.image {
  width: 100%;
  height: auto;
}

.details {
  width: 100%;
  padding-left: 3rem;

  dd {
    font-weight: bold;
  }
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

.inactive {
  opacity: 0.6;
}
</style>
