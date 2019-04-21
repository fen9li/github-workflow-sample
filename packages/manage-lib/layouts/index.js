import AppLayout from './app/app-layout'
import MainLayout from './main/main-layout'
import TableLayout from './table/table-layout'

export default {
  install(Vue) {
    Vue.component('app-layout', AppLayout)
    Vue.component('table-layout', TableLayout)
    Vue.component('main-layout', MainLayout)
  },
}
