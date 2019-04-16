<script>
import CellDefault from './cell-default'

export default {
  name: 'CellActivity',
  components: {
    CellDefault,
  },
  inheritAttrs: false,
  computed: {
    bindings() {
      return {
        ...this.$attrs,
        styleObj(val) {
          switch (val) {
            case 'Active': return { color: '#29d737' }
            case 'Inactive': return { color: '#bbb' }
            default: return {}
          }
        },
        badge(val) {
          switch (val) {
            case 'Active': return {
              name: 'el-icon-success',
              pos: 'left',
            }
            case 'Inactive': return {
              name: 'el-icon-error',
              pos: 'left',
            }
            default: return {}
          }
        },
      }
    },
  },
}
</script>

<template>
  <cell-default v-bind="bindings" />
</template>
