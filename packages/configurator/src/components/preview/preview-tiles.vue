<script>
import get from 'lodash/get'
import PreviewMixin from '~/widgets/preview.mixin'

export default {
  name: 'PreviewTiles',
  mixins: [PreviewMixin],
  computed: {
    textCount() {
      const count = get(this.config, 'props.tiles.length', 0)

      if (count === 1) {
        return `${count} record`
      } else if (count > 1) {
        return `${count} records`
      }

      return 'No records'
    },
  },
}
</script>

<template>
  <div :class="$style.root">
    <span>{{ textCount }}</span>
  </div>
</template>

<style lang="scss" module>
.root {
  display: flex;
  flex-direction: column;
}
</style>
