<script>
import get from 'lodash/get'

export default {
  name: 'EditLayoutTable',
  props: {
    value: {
      type: String,
      required: true,
    },
    values: {
      type: Array,
      default: () => [],
    },
    labels: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    currentValue() {
      return this.values.find(el => el.key === this.value)
    },
    keys() {
      return Object.keys(this.currentValue.items)
    },
  },
  methods: {
    formatValue(key) {
      const item = this.currentValue.items[key]
      return get(item, 'format', el => el)(item.value)
    },
  },
}
</script>

<template>
  <div>
    <div
      v-for="key in keys"
      :key="key"
      :class="$style.grid"
    >
      <div>
        {{ labels[key] }}
      </div>
      <div :class="$style.value">
        {{ formatValue(key) }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" module>
.grid {
  display: grid;
  grid-template-rows: rem(30px);
  grid-template-columns: 1fr 1fr;
  grid-gap: rem(20px);
  line-height: 1.8;
}

.value {
  font-weight: bold;
}
</style>
