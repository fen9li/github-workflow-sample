import store from '~/state/store'
import hero from './hero'
import unknown from './unknown'

function register(widget) {
  store.commit('dashboard/REGISTER_WIDGET', widget)
}

register(unknown)
register(hero)
