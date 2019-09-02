import get from 'lodash/get'
import includes from 'lodash/includes'
import auth0 from 'auth0-js'
import { EventEmitter } from 'events'
import jwtDecode from 'jwt-decode'

const webAuth = new auth0.WebAuth({
  domain: process.env.VUE_APP_AUTH0_DOMAIN,
  redirectUri: `${window.location.origin}/callback`,
  clientID: process.env.VUE_APP_AUTH0_CLIENT_ID,
  responseType: 'token id_token',
  scope: `openid profile email ${process.env.VUE_APP_AUTH0_SCOPES || ''}`.trim(),
  audience: process.env.VUE_APP_AUTH0_AUDIENCE,
})

const localStorageKey = 'loggedIn'
const loginEvent = 'loginEvent'

class AuthService extends EventEmitter {
  contructor() {
    this.idToken = null
    this.accessToken = null
    this.config = null
    this.profile = null
    this.access = null
    this.tokenExpiry = null
  }

  get permissions() {
    return this.access && this.access.permissions
  }

  login(customState) {
    webAuth.authorize({
      appState: customState,
    })
  }

  logout() {
    localStorage.removeItem(localStorageKey)

    this.idToken = null
    this.tokenExpiry = null
    this.profile = null

    webAuth.logout({
      returnTo: `${window.location.origin}`,
    })

    this.emit(loginEvent, { loggedIn: false })
  }

  handleAuthentication() {
    return new Promise((resolve, reject) => {
      webAuth.parseHash((err, authResult) => {
        if (err) {
          // reject(err)
        } else {
          this.localLogin(authResult)
          resolve(authResult.idToken)
        }
      })
    })
  }

  isAuthorized(_scope) {
    const { permissions } = this
    const scope = _scope || get(this.config, 'scope')

    return !scope || includes(permissions, scope) || includes(permissions, 'admin')
  }

  isAuthenticated() {
    return (
      Date.now() < this.tokenExpiry &&
      localStorage.getItem(localStorageKey) === 'true'
    )
  }

  isIdTokenValid() {
    return (
      this.idToken &&
      this.tokenExpiry &&
      Date.now() < this.tokenExpiry
    )
  }

  getIdToken() {
    return new Promise((resolve, reject) => {
      if (this.isIdTokenValid()) {
        resolve(this.idToken)
      } else if (this.isAuthenticated()) {
        this.renewTokens().then(authResult => {
          resolve(authResult.idToken)
        }, reject)
      } else {
        resolve()
      }
    })
  }

  localLogin(authResult) {
    this.idToken = authResult.idToken
    this.accessToken = authResult.accessToken
    this.access = jwtDecode(authResult.accessToken)
    this.profile = authResult.idTokenPayload

    // Convert the expiry time from seconds to milliseconds,
    // required by the Date constructor
    this.tokenExpiry = new Date(this.profile.exp * 1000)

    localStorage.setItem(localStorageKey, 'true')

    this.emit(loginEvent, {
      loggedIn: true,
      accessToken: this.accessToken,
      profile: authResult.idTokenPayload,
      state: authResult.appState || {},
    })
  }

  renewTokens() {
    return new Promise((resolve, reject) => {
      if (localStorage.getItem(localStorageKey) !== 'true') {
        /* eslint-disable prefer-promise-reject-errors */
        return reject()
      }
      webAuth.checkSession({}, (err, authResult) => {
        if (err) {
          reject(err)
        } else {
          this.localLogin(authResult)
          resolve(authResult)
        }
      })
    })
  }
}

const service = new AuthService()

service.setMaxListeners(5)

export default service
