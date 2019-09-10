import Vue from 'vue'
import TheIcon from '@lib/components/the-icon'

const requireComponent = require.context('.', true, /\.vue$/)

requireComponent.keys().forEach(fileName => {
  const component = requireComponent(fileName).default

  if (component.name) {
    Vue.component(component.name, component)
  }
})

Vue.component('the-icon', TheIcon)
