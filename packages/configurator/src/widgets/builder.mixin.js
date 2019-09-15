import get from 'lodash/get'
import debounce from 'lodash/debounce'
import cloneDeep from 'lodash/cloneDeep'
import { mapActions } from 'vuex'

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
  },
  watch: {
    form: {
      handler: debounce(function(value) {
        this.sendConfig()
      }, 300),
      deep: true,
    },
  },
  created() {
    this.widget.registerBuilder(this)
    this.form = cloneDeep(this.props)
  },
  methods: {
    ...mapActions('dashboard', {
      sendConfig: 'SEND_CONFIG',
    }),
  },
}
