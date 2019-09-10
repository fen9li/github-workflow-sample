
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
    }
  },
  created() {
    this.widget.registerBuilder(this)
  },
}
