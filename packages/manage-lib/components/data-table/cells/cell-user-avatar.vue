<script>
import CellMixin from './cell.mixin'

export default {
  name: 'CellHttpStatus',
  mixins: [CellMixin],
  computed: {
  },
}
</script>

<template>
  <el-image
    style="width: 2rem; height: 2rem; border-radius: 50%; opacity: 0.8"
    :src="value"
  >
  </el-image>
</template>
