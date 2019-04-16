<script>
import CellMixin from './cell.mixin'

export default {
  name: 'CellDefault',
  mixins: [CellMixin],
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
    <span>{{ checkEmptyValue(formattedValue) }}</span>
  </div>
</template>
