<script>
import BuilderMixin from '../builder.mixin'

export default {
  name: 'HeroBuilder',
  mixins: [BuilderMixin],
  // data: () => ({
  //   form: null,
  // }),
}
</script>

<template>
  <div class="hero-builder">
    <builder-content
      v-model="form.content"
      exclude="title|size"
    />
    <builder-image
      v-model="form.image"
      :ratio="{
        mobile: '640:280',
        desktop: '1920:400',
      }"
      label="Image"
    />
    <builder-cta
      v-model="form.cta"
      label="Link"
    />
    <builder-select
      v-model="form.gradient"
      label="Gradient"
      :options="[
        { label: 'White Vertical', value: 'white' },
        { label: 'White Horizontal', value: 'hwhite' },
        { label: 'Dark', value: 'dark' },
        { label: 'Light', value: 'light' },
      ]"
    />
  </div>
</template>
