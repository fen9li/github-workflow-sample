<script>
import CellMixin from './cell.mixin.js'

export default {
  name: 'CellButton',
  mixins: [CellMixin],
}
</script>

<template>
  <el-button :style="computedStyle">
    {{ formattedValue }}
  </el-button>
</template>
