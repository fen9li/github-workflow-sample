import './css/index.scss'
import Vue from 'vue'
import App from './app'
import router from './router'
import store from './state/store'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
import widgets from './widgets'
import './components'

Vue.use(ElementUI, { locale })

store.commit('dashboard/REGISTER_WIDGETS', widgets)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
