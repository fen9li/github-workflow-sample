/**
 * mapping validation errors from the server response to a form
 * should be exist ref="form"
 */
export default {
  computed: {
    defaultFormNode() {
      return this.$refs.form.$children[0]
    },
    validation() {
      return {
        form: this.defaultFormNode,
        validate: this.validate.bind(this, this.defaultFormNode),
        validateField: this.validateField.bind(this, this.defaultFormNode),
        resetFields: this.resetFields.bind(this, this.defaultFormNode),
        clearValidate: this.clearValidate.bind(this, this.defaultFormNode),
        mapViolations: this.mapViolations.bind(this, this.defaultFormNode),
      }
    }
  },
  methods: {
    async validate(form) {
      try {
        this.errors = {}
        return await form.validate()
      } catch(exception) {
        return exception
      }
    },
    validateField(form, fields) {
      return form.validateField(fields)
    },
    resetFields(form, fields) {
      return form.resetFields(fields)
    },
    clearValidate(form) {
      return form.clearValidate()
    },
    mapViolations(form, violations) {
      Object.keys(violations).forEach(name => {
        const field = form.fields.find(item => item.prop === name)

        if (field && Array.isArray(violations[name])) {
          this.errors = { ...this.errors, [name]: violations[name].shift() }
        }
      })
    },
  },
}
