<script>
import CellMixin from './cell.mixin'

export default {
  name: 'CellHttpStatus',
  mixins: [CellMixin],
  computed: {
    spanStyle() {
      let error = {}
      try {
        error = Number(this.value[0]) < 4 ? error : {
          color: 'red',
          background: '#FBE6D1',
        }
      } catch (e) {
        //
      }
      return {
        'padding-left': '8px',
        'padding-right': '8px',
        'text-align': 'center',
        'border-radius': '20px',
        'background': '#F3EFEE',
        ...error,
      }
    },
  },
}
</script>

<template>
  <div :style="computedStyle">
    <i
      v-if="computedBadge.name"
      :class="[
        'cell-badge',
        `cell-badge_${computedBadge.pos}`,
        computedBadge.name,
      ]"
    />
    <span :style="spanStyle">
      {{ checkEmptyValue(formattedValue) }}
    </span>
  </div>
</template>
