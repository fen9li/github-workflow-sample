<script>
import CellMixin from './cell.mixin'

export default {
  name: 'CellTag',
  mixins: [CellMixin],
}
</script>

<template>
  <div>
    <i
      v-if="computedBadge.name"
      :class="[
        'cell-badge',
        `cell-badge_${computedBadge.pos}`,
        computedBadge.name,
      ]"
    />
    <span
      class="status-tag"
      :style="computedStyle"
    >
      {{ checkEmptyValue(formattedValue) }}
    </span>
  </div>
</template>
