<script>
import BuilderMixin from '~/widgets/builder-record.mixin'

export default {
  name: 'SliderItemBuilder',
  mixins: [BuilderMixin],
  data: () => ({
    form: null,
  }),
}
</script>

<template>
  <div class="slider-item-builder">
    <builder-content
      v-model="form.content"
      exclude="size|text"
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
