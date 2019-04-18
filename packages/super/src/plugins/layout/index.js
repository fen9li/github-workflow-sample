import ElementUI from 'element-ui'
import AppLayout from './app-layout.vue'
import locale from 'element-ui/lib/locale/lang/en'
import './styles/index.scss'

export default {
  install(Vue) {
    Vue.component('app-layout', AppLayout)
    const includeList = [[ElementUI, { locale }]]
    const use = Vue.use.bind(Vue)
    includeList.forEach(i => use(...i))
  },
}
