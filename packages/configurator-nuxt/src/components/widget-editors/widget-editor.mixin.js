import FormWrap from '../form-wrap'
import CtaEditor from '../elementary/cta-editor'
import ImageEditor from '../elementary/image-editor'

export default {
  props: {
    config: {
      type: null,
    },
  },
  components: {
    FormWrap,
    CtaEditor,
    ImageEditor,
  },
  watch: {
    config: {
      handler(newVal) {
        if (newVal) {
          this.configObj = newVal
        }
      },
      immediate: true,
      deep: true,
    },
  },
}
