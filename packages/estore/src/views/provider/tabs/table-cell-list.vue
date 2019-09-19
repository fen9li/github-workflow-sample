<script>
export default {
  name: 'ListTableCell',
  inheritAttrs: false,
  props: {
    row: {
      type: Object,
      default: () => {}
    },
    align: {
      type: String,
      default: ''
    },
    value: {
      type: Function,
      default: () => []
    },
    offsets: {
      type: Function,
      default: () => []
    }
  },
  computed: {
    items() {
      // That is initil structure, which is likely to be changed with real data
      const { row, value, offsets } = this
      const originalVals = value(null, row)
      const pseudos = offsets(null, row)
      let result = originalVals
      if(pseudos.length) {
        result = originalVals.map((val, idx) => {
          const arr = []
          arr.push(val)
          arr.splice(1,0, ...new Array(pseudos[idx]))
          return arr
        })
      }
      return result
    },
    off() {
      return this.offsets(null, this.bingings.row)
    }
  }
}
</script>

<template>
  <div :class="$style.wrapper">
    <div
      v-for="(item, index) in items"
      :key="index"
      :class="$style.item"
    >
      <div
        v-if="Array.isArray(item)"
      >
        <div
          v-for="(innerItem, idx) in item"
          :key="idx"
          :class="$style.innerItem"
        >
          {{ innerItem }}
        </div>
      </div>
      <div v-else>
        {{ item }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" module>
.wrapper {
  flex-direction: column;
  align-items: initial;
  padding-top: 0;
}

.item {
  padding-bottom: 1rem;
}

.innerItem {
  min-height: rem(31px);
  padding-bottom: .5rem;
}
</style>
