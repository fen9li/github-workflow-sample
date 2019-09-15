<script>
import BuilderMixin from '~/widgets/builder-record.mixin'

export default {
  name: 'TilesItemBuilder',
  mixins: [BuilderMixin],
  data: () => ({
    form: null,
  }),
}
</script>

<template>
  <div class="tiles-item-builder">
    <builder-content
      v-model="form.content"
      exclude="size"
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
