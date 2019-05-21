<script>
import homeHeader from './home-header'
import overviewNumbers from './overview/home-numbers'
import overviewCustomers from './overview/home-customers'
import overviewGraph from './overview/home-graph'
import overviewProducts from './overview/home-products'

export default {
  name: 'Home',
  page: {
    title: 'Dashboard',
  },
  components: {
    homeHeader,
    overviewNumbers,
    overviewCustomers,
    overviewGraph,
    overviewProducts,
  },
}
</script>

<template>
  <main-layout
    :class="$style.wrapper"
    :header="false"
    :fixed-width="false"
  >
    <home-header />
    <div :class="$style.overview">
      <overview-numbers :class="$style.numbers" />
      <overview-graph :class="$style.graph" />
      <overview-customers />
    </div>
    <overview-products />
  </main-layout>
</template>

<style lang="scss" module>
.wrapper {
  display:flex;
  flex-direction: column;
  justify-content: center;

  :global {
    .el-card__body, .el-card__header {
      @include mq($until: md) {
        padding: 1.2rem;
      }

      @include mq($from:md, $until: xxl) {
        padding: 2rem;
      }
    }
  }
}

.overview {
  display: flex;
  width: 100%;
  margin-top: 1.5rem;

  @include mq($until: xl) {
    flex-wrap: wrap;
    justify-content: space-between;
  }
}

.graph {
  @include mq($until: xl) {
    order: 3;
    margin-top: 1.5rem;
  }
}
</style>
