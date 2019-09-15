<script>
import { Tile } from './'
import BuilderMixin from '../builder.mixin'

export default {
  name: 'TilesBuilder',
  mixins: [BuilderMixin],
  data: () => ({
    meta: Tile,
  }),
}
</script>

<template>
  <div class="tiles-builder">
    <builder-wrapper
      v-model="form.wrapper"
      exclude="space"
    />
    <builder-items
      v-model="form.items"
      :meta="meta"
    />
  </div>
</template>
