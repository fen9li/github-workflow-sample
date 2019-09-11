<script>
import get from 'lodash/get'
import PreviewMixin from '../preview.mixin'

export default {
  name: 'TileImagePreview',
  mixins: [PreviewMixin],
  computed: {
    title() {
      return get(this.config, 'props.title', '')
    },
    text() {
      return get(this.config, 'props.text', '')
    },
  },
}
</script>

<template>
  <div :class="$style.root">
    <b
      class="text-reset"
      :class="$style.title"
      v-html="title"
    />
    <div
      class="text-reset"
      :class="$style.text"
      v-html="text"
    />
  </div>
</template>

<style lang="scss" module>
.root {
  position: relative;
}

.title + .text {
  margin-top: rem(4px);
}
</style>
