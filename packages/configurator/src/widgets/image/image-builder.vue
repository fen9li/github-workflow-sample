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
  <div class="image-builder">
    <builder-image
      v-model="form.image"
    />
    <builder-cta
      v-model="form.cta"
    />
  </div>
</template>
