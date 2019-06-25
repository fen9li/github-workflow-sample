<script>
import CellMixin from './cell.mixin'

export default {
  name: 'CellDefault',
  mixins: [CellMixin],
}
</script>

<template>
  <div :style="computedStyle">
    <div
      v-if="computedBadge.name || computedBadge.status"
      :class="[
        'cell-badge',
        `cell-badge_${computedBadge.pos}`,
        computedBadge.name,
        computedBadge.status
      ]"
    />
    <span>{{ checkEmptyValue(formattedValue) }}</span>
  </div>
</template>
