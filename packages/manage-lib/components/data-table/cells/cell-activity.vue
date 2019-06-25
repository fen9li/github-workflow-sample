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
        styleObj(value, row) {
          const val = typeof value === 'function'? value(null, row) : value
          switch (val.toLowerCase()) {
            case 'active': return { color: '#29d737' }
            case 'inactive': return { color: '#bbb' }
            default: return {}
          }
        },
        badge(value, row) {
          const val = typeof value === 'function'? value(null, row) : value
          switch (val.toLowerCase()) {
            case 'active': return {
              status: 'cell-status cell-status_active',
              pos: 'left',
            }
            case 'inactive': return {
              status: 'cell-status cell-status_inactive',
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
