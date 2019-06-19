const emptyRE = /undefined|null|^$/

export default {
  props: {
    value: {
      type: [String, Number, Boolean],
      required: true,
    },
    formattedValue: {
      type: [String, Number, Boolean],
      required: true,
    },
    attribute: {
      type: String,
      required: true,
    },
    row: {
      type: Object,
      required: true,
    },
    styleObj: {
      type: [Function, Object],
      default: () => ({}),
    },
    badge: {
      type: [Function, Object],
      default: () => ({}),
    },
    allowEmpty: {
      type: Boolean,
      default: false,
    },
    format: {
      type: Function,
      default: () => ({}),
    },
  },
  computed: {
    computedStyle() {
      const { styleObj, value, row, attribute } = this

      if (typeof styleObj === 'function') {
        return styleObj(value, row, attribute)
      } else if (styleObj instanceof Object) {
        return styleObj
      }

      throw Error('"styleObj" key must be object|function')
    },
    computedBadge() {
      const { badge, value, row, attribute } = this

      if (typeof badge === 'function') {
        return badge(value, row, attribute)
      } else if (badge instanceof Object) {
        return badge
      }

      throw Error('"badge" key must be object|function')
    },
  },
  methods: {
    checkEmptyValue(value) {
      if (emptyRE.test(value)) {
        if (this.allowEmpty) {
          return ''
        }

        return '—'
      }

      return value
    },
  },
}
