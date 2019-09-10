
export default {
  props: {
    label: {
      type: String,
      default: ''
    },
    value: {
      type: [String, Object],
      default: '',
    },
  },
  watch: {
    form: {
      handler(value) {
        this.onInput(value)
      },
      deep: true,
    },
  },
  created() {
    this.initForm()
  },
  methods: {
    onInput(value) {
      this.$emit('input', value)
    },
    initForm() {
      const { value, form } = this

      if (value && value instanceof Object) {
        for (const key in value) {
          if (form.hasOwnProperty(key)) {
            form[key] = value[key]
          }
        }
      }
    },
  },
}
