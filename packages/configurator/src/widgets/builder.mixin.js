import get from 'lodash/get'
import debounce from 'lodash/debounce'
import { getTemplate } from './templates'
import cloneDeep from 'lodash/cloneDeep'

export default {
  props: {
    widget: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    form: {},
  }),
  computed: {
    initialConfig() {
      return this.widget.config
    },
    props() {
      return get(this.widget, 'config.props', {})
    },
    template() {
      const name = get(this.widget, 'meta.name')
      const template = getTemplate(name)

      return get(template, 'data.props', {})
    },
  },
  created() {
    this.widget.registerBuilder(this)
    this.initForm()
    this.$watch('form', debounce(function(value) {
      this.$emit('build')
    }, 400), { deep: true })
  },
  methods: {
    initForm() {
      const { template, props } = this

      this.form = cloneDeep({
        ...template,
        ...props,
      })
    },
  },
}
