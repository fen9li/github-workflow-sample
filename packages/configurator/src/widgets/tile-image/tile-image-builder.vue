<script>
import BuilderMixin from '../builder.mixin'

export default {
  name: 'TileImageBuilder',
  mixins: [BuilderMixin],
  computed: {
    isShort() {
      return this.form.short
    }
  }
}
</script>

<template>
  <div class="tile-image-builder">
    <builder-content
      v-model="form.content"
      :limits="{ title: isShort ? 20 : 80, text: 135 }"
    />
    <builder-image
      v-model="form.image"
      :ratio="{
        mobile: '580:290',
        desktop: isShort ? '878:285' : '575:285',
      }"
      label="Image"
    />
    <builder-cta
      v-model="form.cta"
      label="Link"
    />
    <builder-radio
      v-model="form.short"
      label="Short text tile"
      type="boolean"
    />
    <builder-wrapper
      v-model="form.wrapper"
      exclude="row"
    />
  </div>
</template>
