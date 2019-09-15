<script>
import BuilderMixin from '~/widgets/builder-record.mixin'

export default {
  name: 'TilesShortBuilderItem',
  mixins: [BuilderMixin],
}
</script>

<template>
  <div class="tiles-short-builder-item">
    <builder-content
      v-model="form.content"
      exclude="size|title"
    />
    <builder-image
      v-model="form.image"
      :ratio="{
        mobile: '13:4',
        desktop: '32:5',
      }"
    />
    <builder-cta
      v-model="form.cta"
      label="Link"
    />
  </div>
</template>
