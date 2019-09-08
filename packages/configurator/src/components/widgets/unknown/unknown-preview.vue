<script>
import PreviewMixin from '../preview.mixin'

export default {
  name: 'UnknownPreview',
  mixins: [PreviewMixin],
}
</script>

<template>
  <div :class="$style.root">
    {{ config }}
  </div>
</template>

<style lang="scss" module>
.root {
  position: relative;
}
</style>
