import get from 'lodash/get'
import debounce from 'lodash/debounce'
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
    config() {
      return get(this.widget, 'config', {})
    },
  },
  created() {
    this.widget.registerBuilder(this)
    this.initForm()
    this.$watch('form', debounce(function(value) {
      this.$emit('build')
    }, 300), { deep: true })
  },
  methods: {
    initForm() {
      this.form = cloneDeep(this.config)
    },
  },
}
