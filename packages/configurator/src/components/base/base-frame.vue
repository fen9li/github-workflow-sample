<script>
import Vue from 'vue'

export default {
  name: 'BaseFrame',
  beforeUpdate() {
    this.iApp.children = Object.freeze(this.$slots.default)
  },
  methods: {
    renderChildren() {
      const children = this.$slots.default
      const body = this.$el.contentDocument.body
      const el = document.createElement('DIV') // we will mount or nested app to this element
      body.appendChild(el)

      const iApp = new Vue({
      	name: 'IApp',
        data: { children: Object.freeze(children) },
        render(h) {
          return h('div', this.children)
        },
      })

      iApp.$mount(el)

      this.iApp = iApp
      this.$emit('load')
    }
  }
}
</script>

<template>
  <iframe @load="renderChildren()" />
</template>
