import { mapActions } from 'vuex'
import debounce from 'lodash/debounce'

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
  },
  methods: {
    ...mapActions('dashboard', {
      sendConfig: 'SEND_CONFIG',
    }),
  },
}
