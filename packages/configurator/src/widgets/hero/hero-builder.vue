<script>
import BuilderMixin from '../builder.mixin'

export default {
  name: 'HeroBuilder',
  mixins: [BuilderMixin],
  data: () => ({
    form: null,
  }),
  created() {
    if (!this.form) {
      this.form = {
        ...this.initialConfig.props,
      }
    }
  },
}
</script>

<template>
  <div class="hero-builder">
    <builder-textarea
      v-model="form.text"
      label="Text"
    />
    <builder-image
      v-model="form.image"
      :ratio="{
        mobile: '13:4',
        desktop: '32:5',
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
