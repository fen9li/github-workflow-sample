import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './state/store'
import ManageLib from '@lib'

Vue.use(ManageLib, {
  // router,
  // store,
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
