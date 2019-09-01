export default {
  props: {
    value: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    const form = { ...this.value }

    return {
      form,
      skipNextValueWatcher: false,
    }
  },
  watch: {
    value: {
      handler() {
        if (this.skipNextValueWatcher) {
          this.skipNextValueWatcher = false
        } else {
          this.form = { ...this.value }
        }
      },
      deep: true,
    },
    form: {
      handler() {
        this.$emit('input', { ...this.form })
        this.skipNextValueWatcher = true
      },
      deep: true,
    },
  },
}
