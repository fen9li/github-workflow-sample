import authService from "./auth.service"
import authState from "./auth.state"

export default {
  install(Vue, options) {
    const { store } = options
    /*
     * Register auth service in Vue instance
     * and add handling for login event
     */
    Vue.prototype.$auth = authService
    Vue.prototype.$grant = scope => {
      return authService.isAuthorized(scope)
    }

    authService.config = options.config

    Vue.mixin({
      created() {
        if (this.handleLoginEvent) {
          authService.addListener("loginEvent", this.handleLoginEvent)
        }
      },

      destroyed() {
        if (this.handleLoginEvent) {
          authService.removeListener("loginEvent", this.handleLoginEvent)
        }
      }
    })

    /*
     * Register auth state
     */
    if (store) {
      store.registerModule("auth", authState)

      authService.addListener("loginEvent", e => {
        const profile = e.loggedIn ? e.profile : null
        const accessToken = e.loggedIn ? e.accessToken : null
        store.commit("auth/SET_PROFILE", profile)
        store.commit("auth/SET_TOKEN", accessToken)
      })
    }
  }
}
