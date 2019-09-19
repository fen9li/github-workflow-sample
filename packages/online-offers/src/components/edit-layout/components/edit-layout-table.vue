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
      const { value, values } = this

      const valByKey = values.find(el => el.key === value)

      if (valByKey) {
        return valByKey
      }

      return values.find(el => el.id === value)
    },
    keys() {
      return Object.keys(get(this.currentValue, 'items', {}))
    },
  },
  methods: {
    formatValue(key) {
      const item = this.currentValue.items[key]
      const type = this.currentValue.items.type.value
      return get(item, 'format', (type, el) => el || '-')(type, item.value)
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
