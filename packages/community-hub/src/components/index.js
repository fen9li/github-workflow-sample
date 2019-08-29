import Icon from './icon/icon.vue'
import HubImageUploader from './hub-image-uploader/hub-image-uploader.vue'

export default {
  install(Vue, options) {
    Vue.component('the-icon', Icon)
    Vue.component('hub-image-uploader', HubImageUploader)
  },
}
