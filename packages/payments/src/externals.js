import Vue from 'vue'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

const use = Vue.use.bind(Vue)
const includeList = [[ElementUI, { locale }]]

includeList.forEach(i => use(...i))
