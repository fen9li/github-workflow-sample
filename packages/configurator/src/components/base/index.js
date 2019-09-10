import Vue from 'vue'
import TheIcon from '@lib/components/the-icon'

const components = require.context('.', true, /\.vue$/)

components.keys().forEach(key => {
  const component = components(key).default
  Vue.component(component.name, component)
})

Vue.component('base-icon', TheIcon)
