import get from 'lodash/get'

export default {
  props: {
    config: {
      type: Object,
      default: null,
    },
  },
  computed: {
    wdata() {
      if (this.config.hasOwnProperty('props')) {
        return get(this.config, 'props', {})
      }

      return this.config || {}
    },
    title() {
      return get(this.wdata, 'content.title', '')
    },
    text() {
      return get(this.wdata, 'content.text', '')
    },
    image() {
      return get(this.wdata, 'image', null)
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
