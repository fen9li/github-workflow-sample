<script>
import BuilderMixin from '../builder.mixin'

export default {
  name: 'ImageBuilder',
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
  <div>
    <builder-image
      v-model="form.image"
      :ratio="{
        mobile: '2:1',
        desktop: '4:1',
      }"
      label="Image"
    />
    <builder-cta
      v-model="form.cta"
    />
  </div>
</template>
