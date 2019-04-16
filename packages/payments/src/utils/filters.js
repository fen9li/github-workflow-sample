import Vue from 'vue'
import formatDollar from '@utils/format-dollar'
import { formatDate } from '@utils/format-date'


Vue.filter('dollar', formatDollar)
Vue.filter('date', v => formatDate(v, 'DD/MM/YYYY'))
Vue.filter('dateTime', v => formatDate(v, 'DD/MM/YYYY hh:mm A'))
Vue.filter('uppercase', v => (v || '').toUpperCase())
