<script>
import CellMixin from './cell.mixin'

export default {
  name: 'CellImage',
  mixins: [CellMixin],
}
</script>

<template>
  <div
    v-if="formattedValue"
    class="cell-image"
    :style="{'background-image': `url(${formattedValue})`}"
  />
</template>
