import Vue from 'vue'
import App from './app'
import router from '~/router.js'
import store from '~/state/store.js'
import ManageLib from '@lib'
import applications from '@lib/applications'

Vue.use(ManageLib, {
  config: applications.payments,
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
