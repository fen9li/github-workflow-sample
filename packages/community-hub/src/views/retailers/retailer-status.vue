<script>
import capitalize from 'lodash/capitalize'

export default {
  name: 'RetailerStatus',
  inheritAttrs: false,
  props: {
    status: {
      type: String,
      required: true,
    },
    inactiveStyle: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    title() {
      return capitalize(this.status)
    },
    styleObj() {
      switch (this.status) {
        case 'active':
          return {
            color: '#0fbd1c'
          }
        case 'inactive':
          return this.inactiveStyle
        default:
          return {}
      }
    },
  },
}
</script>

<template>
  <div
    :class="$style.container"
    :style="styleObj"
  >
    <div :class="$style.badge" />
    {{ title }}
  </div>
</template>

<style lang="scss" module>
.container {
  display: flex;
  align-items: center;
}

.badge {
  width: rem(10px);
  height: rem(10px);
  margin-right: rem(10px);
  background-color: currentColor;
  border-radius: 50%;
}
</style>
