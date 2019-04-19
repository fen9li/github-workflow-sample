import AuthPlugin from './plugins/auth'
import LayoutPlugin from './plugins/layout'
import './components/base'

export default {
  install(Vue, options) {
    const { router, store } = options

    Vue.use(LayoutPlugin)
    Vue.use(AuthPlugin, {
      router,
      store,
    })
  },
}
