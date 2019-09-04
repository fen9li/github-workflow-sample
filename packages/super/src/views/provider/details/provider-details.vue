<script>
import capitalize from 'lodash/capitalize'
import ProviderList from './provider-list'
import ProviderStatus from './provider-status'
import ProviderProducts from './provider-products'

export default {
  name: 'ProviderDetails',
  components: {
    ProviderList,
    ProviderStatus,
    ProviderProducts,
  },
  props: {
    provider: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    status() {
      return this.provider.status ? capitalize(this.provider.status) : 'Empty status'
    },
  },
  methods: {
    capitalize,
    onClick() {
      this.$emit('click')
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
      <div :class="$style.title">
        Provider Details
        <provider-status :status="status" />
      </div>
      <el-button
        type="primary"
        @click="onClick"
      >
        Edit Provider Details
      </el-button>
    </div>
    <provider-list
      :provider="provider"
    />
    <hr
      :class="[
        'divider-primary',
        [$style.divider]
      ]"
    >
    <provider-products
      :products="provider.products"
    />
  </el-card>
</template>

<style lang="scss" module>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.title {
  display: flex;
  flex: 1 0 50%;
  align-items: center;
}

.divider {
  margin: rem(40px 0);
}
</style>
