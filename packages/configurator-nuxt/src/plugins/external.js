import Vue from 'vue'
import ElementUI from 'element-ui'
import RichTextarea from '@loyaltycorp/manage-lib/components/rich-textarea'
import ImageUploader from '@loyaltycorp/manage-lib/components/image-uploader'

Vue.use(ElementUI)
Vue.component('rich-textarea', RichTextarea)
Vue.component('image-uploader', ImageUploader)
