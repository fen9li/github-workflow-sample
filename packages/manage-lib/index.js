import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
// CSS import must be first to allow hierarchy based overriding
import './styles/index.scss'
import './sw-register'
import Auth from './auth'
import Layouts from './layouts'
import Components from './components'
import Router from './router'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import utils from './utils'
import { ApiHelper } from './api'

dayjs.extend(utc)

export default {
  install(Vue, options) {
    const includeList = [[ElementUI, { locale }]]
    const use = Vue.use.bind(Vue)
    includeList.forEach(i => use(...i))

    Vue.use(Components, options)
    Vue.use(Layouts, options)
    Vue.use(Auth, options)
    Vue.use(Router, options)
    Vue.use(utils, options)

    Vue.prototype.$api = new ApiHelper({
      baseURL: process.env.VUE_APP_API_URL,
    })

    Vue.config.productionTip = process.env.NODE_ENV === 'production'
  },
}
