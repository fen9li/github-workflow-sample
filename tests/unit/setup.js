import Vuex from 'vuex'
import VueRouter from 'vue-router'
import testUtils from '@vue/test-utils'

require('babel-plugin-require-context-hook/register')()

function createLocalVue() {
  const localVue = testUtils.createLocalVue()

  document.createRange = function() {}

  localVue.use(Vuex)
  localVue.use(VueRouter)

  localVue.directive('tooltip', {})
  localVue.directive('validate', {})
  localVue.directive('promise-btn', {})

  return localVue
}

async function createWrapper(component, options) {
  global.provider = {
    manifest: {},
    config: require('../mock-api/resources/provider/config'),
    done: true,
  }

  const localVue = createLocalVue()
  const router = new VueRouter({
    mode: 'history',
    routes: [
      {
        path: '/',
        name: 'home',
      },
    ],
  })

  const store = new Vuex.Store()

  return {
    localVue,
    router,
    store,
  }
}

global.mount = testUtils.mount
global.shallowMount = testUtils.shallowMount
global.createLocalVue = createLocalVue
global.createWrapper = createWrapper
