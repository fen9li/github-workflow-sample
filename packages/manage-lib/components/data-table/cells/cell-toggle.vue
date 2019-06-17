<script>
import CellMixin from './cell.mixin'

export default {
  name: 'CellToggle',
  mixins: [CellMixin],
  props: {
    enabled: {
      type: Function,
      default: () => false,
    },
  },
  computed: {
    switchValue() {
      return this.enabled(this.value, this.formattedValue) || !!this.value
    },
  },
}
</script>

<template>
  <el-switch
    :value="switchValue"
  />
</template>
