import HubImageUploader from './hub-image-uploader/hub-image-uploader.vue'
import Textarea from './textarea/textarea.vue'

export default {
  install(Vue, options) {
    Vue.component('hub-image-uploader', HubImageUploader)
    Vue.component('the-textarea', Textarea)
  },
}
