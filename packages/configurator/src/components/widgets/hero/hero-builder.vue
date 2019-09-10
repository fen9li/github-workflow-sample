<script>
import BuilderMixin from '../builder.mixin'

export default {
  name: 'HeroWidget',
  mixins: [BuilderMixin],
}
</script>

<template>
  <div :class="$style.root">
    Hero Settings
  </div>
</template>

<style lang="scss" module>
.root {
  position: relative;
}
</style>
