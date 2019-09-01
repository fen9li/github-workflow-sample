import Vue from 'vue'

const ctx = require.context('.', false, /.vue$/)

ctx.keys().forEach(fileName => {
  const comp = ctx(fileName).default

  Vue.component(comp.name, comp)
})