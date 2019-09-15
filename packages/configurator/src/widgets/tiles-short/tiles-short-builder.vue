<script>
import { TilesShortItem } from './'
import BuilderMixin from '../builder.mixin'

export default {
  name: 'TilesShortBuilder',
  mixins: [BuilderMixin],
  data: () => ({
    meta: TilesShortItem,
  }),
}
</script>

<template>
  <div class="tiles-short-builder">
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
