<script>
import SettingsMixin from '../settings.mixin'

export default {
  name: 'HeroWidget',
  mixins: [SettingsMixin],
}
</script>

<template>
  <div :class="$style.root">
    Hero
  </div>
</template>

<style lang="scss" module>
.root {
  position: relative;
}
</style>
