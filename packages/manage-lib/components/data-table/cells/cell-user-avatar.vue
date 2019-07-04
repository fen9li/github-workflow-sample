<script>
import CellMixin from './cell.mixin'

export default {
  name: 'CellUserAvatar',
  mixins: [CellMixin],
  computed: {
  },
}
</script>

<template>
  <el-image
    :class="$style.root"
    :src="value"
    :fit="'contain'"
  />
</template>

<style lang="scss" module>
  .root {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
  }
</style>
