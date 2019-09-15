<script>
import { ImagesItem } from './'
import BuilderMixin from '../builder.mixin'

export default {
  name: 'ImagesBuilder',
  mixins: [BuilderMixin],
  data: () => ({
    meta: ImagesItem,
  }),
}
</script>

<template>
  <div class="images-builder">
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
