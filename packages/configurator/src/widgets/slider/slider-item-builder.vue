<script>
import BuilderMixin from '~/widgets/builder-record.mixin'

export default {
  name: 'SliderItemBuilder',
  mixins: [BuilderMixin],
}
</script>

<template>
  <div class="slider-item-builder">
    <builder-content
      v-model="form.content"
      exclude="size|text"
      :limits="{ title: 70 }"
    />
    <builder-image
      v-model="form.image"
      :ratio="{
        mobile: '520:416',
        desktop: '1180:390',
      }"
    />
    <builder-cta
      v-model="form.cta"
      label="Link"
      exclude="label"
    />
  </div>
</template>
