import BaseLoader from './loader'
import DataFilter from './data-filter/data-filter'
import DataTable from './data-table/data-table'
import StateDialog from './state-dialog'
import AsCode from './as-code'
import ImageUploader from './image-uploader'
import RichTextarea from './rich-textarea'
import RichRenderer from './rich-renderer'

export default {
  install(Vue, options) {
    Vue.component('base-loader', BaseLoader)
    Vue.component('data-filter', DataFilter)
    Vue.component('data-table', DataTable)
    Vue.component('state-dialog', StateDialog)
    Vue.component('as-code', AsCode)
    Vue.component('image-uploader', ImageUploader)
    Vue.component('rich-textarea', RichTextarea)
    Vue.component('rich-renderer', RichRenderer)
  },
}
