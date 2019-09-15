import get from 'lodash/get'

export default {
  props: {
    config: {
      type: Object,
      default: null,
    },
  },
  computed: {
    title() {
      return get(this.config, 'props.content.title', '')
    },
    text() {
      return get(this.config, 'props.content.text', '')
    },
    image() {
      return get(this.config, 'props.image', null)
    },
    mobile() {
      return get(this.image, 'mobile', '')
    },
    desktop() {
      return get(this.image, 'desktop', '')
    },
    alt() {
      return get(this.image, 'alt', '')
    },
  },
}
