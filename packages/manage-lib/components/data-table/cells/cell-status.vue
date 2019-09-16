<script>
import CellMixin from './cell.mixin'

export default {
  name: 'CellStatus',
  mixins: [CellMixin],
}
</script>

<template>
  <div
    :class="$style.container"
    :style="computedStyle"
  >
    <div :class="$style.badge" />
    {{ checkEmptyValue(formattedValue) }}
  </div>
</template>

<style lang="scss" module>
.container {
  display: flex;
  align-items: center;
}

.badge {
  width: rem(10px);
  height: rem(10px);
  margin-right: rem(10px);
  background-color: currentColor;
  border-radius: 50%;
}
</style>
