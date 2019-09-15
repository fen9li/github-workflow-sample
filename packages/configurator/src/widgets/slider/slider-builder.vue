<script>
import { SliderItem } from './'
import BuilderMixin from '../builder.mixin'

export default {
  name: 'SliderBuilder',
  mixins: [BuilderMixin],
  data: () => ({
    meta: SliderItem,
  }),
}
</script>

<template>
  <div class="slider-builder">
    <builder-items
      v-model="form.items"
      :meta="meta"
    />
  </div>
</template>
