import BaseLoader from './loader'
import DataFilter from './data-filter/data-filter'
import DataTable from './data-table/data-table'
import StateDialog from './state-dialog'

export default {
  install(Vue, options) {
    Vue.component('base-loader', BaseLoader)
    Vue.component('data-filter', DataFilter)
    Vue.component('data-table', DataTable)
    Vue.component('state-dialog', StateDialog)
  },
}
