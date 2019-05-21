<script>

export default {
  name: 'HomeProductsStats',
  props: {
    products: {
      type: Array,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  computed: {
    isSingle() {
      return this. type === 'Single'
    },
    color() {
      return this.isSingle ? '#5AADFA' : 'var(--color-purple)'
    },
  },
  methods: {
    numberWithComma(num) {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
    itemsCount(count) {
      const { isSingle, numberWithComma } = this
      return `${numberWithComma(count)} ${isSingle ? 'Sold' : 'Subscribed'}`
    },
    progressCalc(items, current) {
      const highest = Math.max(...items.map(v => v.count), 0)

      return (current / highest ) * 100
    },
    goTo() {
      this.$router.push({
        name: this.isSingle ? 'products-single' : 'products-subscription',
      })
    },
  },
}
</script>

<template>
  <div :class="$style.wrapper">
    <div :class="$style.title">
      {{ `${type} Products` }}
    </div>
    <div
      :class="$style.products"
    >
      <div
        v-for="(item, index) in products"
        :key="index"
        :class="$style.product"
      >
        <div :class="$style.description">
          <span> {{ item.name }}</span>
          <span> {{ itemsCount(item.count) }}</span>
        </div>
        <el-progress
          :stroke-width="12"
          :percentage="progressCalc(products, item.count)"
          :show-text="false"
          :color="color"
          :class="$style.progress"
        />
      </div>
    </div>
    <el-button
      :class="$style.button"
      type="primary"
      @click="goTo"
    >
      {{ `View ${type} Products` }}
    </el-button>
  </div>
</template>

<style lang="scss" module>
.wrapper {
  flex-basis: 45%;
  margin-top: 2rem;

  @include mq($until: xl) {
    flex-basis: 48%;
  }
}

.title {
  font-size: 1.2rem;
  font-weight: 700;
}

.description {
  display: flex;
  justify-content: space-between;
  padding-top: 2rem;

  @include mq($until: md) {
    padding-top: 1.2rem;
  }
}

.progress {
  margin-top: .7rem;
}

.button {
  width: 15rem !important;
  margin-top: 2.5rem;
}
</style>
