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
          switch (val.toLowerCase()) {
            case 'active': return { color: '#29d737' }
            case 'inactive': return { color: '#bbb' }
            default: return {}
          }
        },
        badge(val) {
          switch (val) {
            case 'active': return {
              name: 'el-icon-success',
              pos: 'left',
            }
            case 'inactive': return {
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
