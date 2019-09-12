<script>
import get from 'lodash/get'
import PreviewMixin from '../preview.mixin'

export default {
  name: 'TilesrPreview',
  mixins: [PreviewMixin],
  computed: {
    text() {
      const tilesCount = get(this.config, 'props.tiles.length', 0)

      if (tilesCount === 1) {
        return `${tilesCount} tiles`
      } else if (tilesCount > 1) {
        return `${tilesCount} tiles`
      }

      return 'No tiles'
    },
  },
}
</script>

<template>
  <div :class="$style.root">
    <span
      class="text-reset"
      v-html="text"
    />
  </div>
</template>

<style lang="scss" module>
.root {
  position: relative;
}
</style>
