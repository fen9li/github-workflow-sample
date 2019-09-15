<script>
import BuilderMixin from '../builder.mixin'

export default {
  name: 'TextBuilder',
  mixins: [BuilderMixin],
  data: () => ({
    form: null,
  }),
  computed: {
    config() {
      return this.form
    },
  },
}
</script>

<template>
  <div class="hero-builder">
    <builder-content
      v-model="form.content"
      exclude="title|size"
    />
  </div>
</template>
