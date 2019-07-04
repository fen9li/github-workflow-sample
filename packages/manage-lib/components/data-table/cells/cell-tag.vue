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
      :class="$style.tag"
      :style="computedStyle"
    >
      {{ checkEmptyValue(formattedValue) }}
    </span>
  </div>
</template>

<style lang="scss" module>
.tag {
  min-width: 3rem;
  padding: 0 .5rem;
  text-align: center;
  background: #F3EFEE;
  border-radius: rem(20px);
}
</style>
