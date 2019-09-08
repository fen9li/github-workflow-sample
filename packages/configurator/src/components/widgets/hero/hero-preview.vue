<script>
import get from 'lodash/get'
import PreviewMixin from '../preview.mixin'

export default {
  name: 'HeroPreview',
  mixins: [PreviewMixin],
  computed: {
    text() {
      return get(this.config, 'props.text', '')
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
