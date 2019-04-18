import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './state/store'
import './components/base'
import './registerServiceWorker'
import AuthPlugin from './plugins/auth'
import LayoutPlugin from './plugins/layout'

Vue.config.productionTip = false

Vue.use(LayoutPlugin)
Vue.use(AuthPlugin, {
  router,
  store,
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
