import formatDollar from './format-dollar'
import { formatDate } from './format-date'

export default {
  install(Vue, options) {
    Vue.filter('dollar', formatDollar)
    Vue.filter('date', v => formatDate(v, 'DD/MM/YYYY'))
    Vue.filter('dateTime', v => formatDate(v, 'DD/MM/YYYY hh:mm A'))
    Vue.filter('uppercase', v => (v || '').toUpperCase())
  },
}
