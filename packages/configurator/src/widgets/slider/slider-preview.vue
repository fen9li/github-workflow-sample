<script>
import get from 'lodash/get'
import PreviewMixin from '../preview.mixin'

export default {
  name: 'SliderPreview',
  mixins: [PreviewMixin],
  computed: {
    text() {
      const slidesCount = get(this.config, 'props.slides.length', 0)

      if (slidesCount === 1) {
        return `${slidesCount} slide`
      } else if (slidesCount > 1) {
        return `${slidesCount} slides`
      }

      return 'No slides'
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
