export default {
  props: {
    label: {
      type: String,
      default: ''
    },
    value: {
      type: [String, Object, Number, Boolean, Array],
      default: '',
    },
    exclude: {
      type: String,
      default: ''
    },
  },
  watch: {
    form: {
      handler(form) {
        this.onInput(form)
      },
      deep: true,
    },
  },
  data: () => ({
    form: {},
  }),
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
            const formValue = form[key]
            const inValue = value[key]

            if (inValue instanceof Object) {
              form[key] = {
                ...(formValue || {}),
                ...(inValue || {}),
              }
            } else {
              form[key] = value[key]
            }
          }
        }
      }
    },
    shown(field) {
      return this.exclude.indexOf(field) < 0
    },
  },
}
