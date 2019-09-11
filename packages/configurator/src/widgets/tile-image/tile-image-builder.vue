<script>
import BuilderMixin from '../builder.mixin'

export default {
  name: 'TileImageBuilder',
  mixins: [BuilderMixin],
  data: () => ({
    form: null,
  }),
  created() {
    if (!this.form) {
      this.form = {
        align: 'left',
        imageSize: 'half',
        space: true,
        ...this.initialConfig.props,
      }
    }
  },
}
</script>

<template>
  <div class="hero-builder">
    <builder-textarea
      v-model="form.title"
      label="Title"
    />
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
    <builder-radio
      v-model="form.align"
      label="Text tile alignment"
      :options="[
        { label: 'Left', value: 'left' },
        { label: 'Right', value: 'right' },
      ]"
    />
    <builder-radio
      v-model="form.imageSize"
      label="Image Size"
      :options="[
        { label: '1/2', value: 'half' },
        { label: '3/4', value: 'long' },
      ]"
    />
    <builder-radio
      v-model="form.space"
      label="Space between"
      type="boolean"
    />
  </div>
</template>
