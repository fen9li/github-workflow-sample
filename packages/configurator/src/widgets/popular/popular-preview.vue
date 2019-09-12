<script>
import PreviewMixin from '../preview.mixin'

export default {
  name: 'PopularPreview',
  mixins: [PreviewMixin],
}
</script>

<template>
  <div :class="$style.root">
    Show your popular brands from API
  </div>
</template>

<style lang="scss" module>
.root {
  position: relative;
}
</style>
