<script>
import CellMixin from './cell.mixin.js'

export default {
  name: 'CellLink',
  mixins: [CellMixin],
}
</script>

<template>
  <router-link :style="computedStyle">
    <i
      v-if="computedBadge.name"
      :class="[
        'cell-badge',
        `cell-badge_${computedBadge.pos}`,
        computedBadge.name,
      ]"
    />
    <span>{{ checkEmptyValue(formattedValue) }}</span>
  </router-link>
</template>
