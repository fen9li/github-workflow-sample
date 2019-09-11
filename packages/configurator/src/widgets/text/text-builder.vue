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
  watch: {
    initialConfig: {
      handler(newVal, oldVal) {
        if (newVal) {
          this.form = this.initialConfig.props
        }
      },
      deep: true,
    },
  },
  created() {
    if (!this.form) {
      this.form = this.initialConfig.props
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
  </div>
</template>
