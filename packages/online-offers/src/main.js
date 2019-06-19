import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './state/store'
import ManageLib from '@lib'
import applications from '@lib/applications'

Vue.use(ManageLib, {
  config: applications.onlineOffers,
  router,
  store,
})

new Vue({
  router,
  store,
  created() {
    this.$store.dispatch('feeds/getFeeds')
  },
  render: h => h(App),
}).$mount('#app')
