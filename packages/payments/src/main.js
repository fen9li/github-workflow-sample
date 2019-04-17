import Vue from 'vue'
// CSS import must be first to allow hierarchy based overriding
import App from './app'
import router from '@router'
import store from '@state/store'
import '@components'
import './externals'
import './utils/filters'
import AuthPlugin from '@loyalty-corp/superadmin/src/plugins/auth'
import '@loyalty-corp/superadmin/src/components/base'

// Don't warn about using the dev version of Vue in development.
Vue.config.productionTip = process.env.NODE_ENV === 'production'

Vue.use(AuthPlugin, {
  router,
  store,
})

const app = new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

// If running inside Cypress...
if (window.Cypress) {
  // Attach the app to the window, which can be useful
  // for manually setting state in Cypress commands
  // such as `cy.logIn()`.
  window.__app__ = app
  Vue.config.errorHandler = window.Cypress.cy.onUncaughtException
}
