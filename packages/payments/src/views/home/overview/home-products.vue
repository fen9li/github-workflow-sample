<script>
import productsStats from './products-stats'
import productsData from '@tests/__fixtures__/home-products.js'

export default {
  name: 'HomeOverviewProducts',
  components: {
    productsStats,
  },
  data() {
    return {
      productsData,
    }
  },
}
</script>

<template>
  <el-card :class="$style.card">
    <div :class="$style.wrapper">
      <span :class="[$style.title, 'test-class']">
        Top 3 Products Overview
      </span>
      <div
        :class="$style.stats"
      >
        <products-stats
          type="Single"
          :products="productsData.single"
        />
        <products-stats
          type="Subscription"
          :products="productsData.subscriptions"
        />
      </div>
    </div>
  </el-card>
</template>

<style lang="scss" module>
.card {
  flex-basis: 100%;
  margin-top: 1.5rem;
}

.title {
  font-size: 1.4rem;
}

.stats {
  display: flex;
  justify-content: space-between;

  @include mq($until: lg) {
    flex-direction: column;
  }
}
</style>
