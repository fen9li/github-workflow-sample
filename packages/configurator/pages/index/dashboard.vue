<script>
import get from 'lodash/get'

export default {
  name: 'Dashboard',
  data() {
    return {
      hero: {
        "title": "<strong>Hi, {{user.first_name}}</strong><br><br><strong>Welcome to rewards</strong><br>Find great savings on brands below",
        "gradient": "dark",
        "image": "https://i.ewalletcdn.com/8c238593-f39b-4bed-a9f2-efe69412e90e/",
      },
    }
  },
  methods: {
    send() {
      const origin = window.location.origin
      const frame = window.frames['app-frame']

      console.log(frame)

      const payload = [
        {
          "name": "hero",
          "props": {
            "hero": this.hero,
          }
        }
      ]

      const message = {
        type: 'dashboard',
        payload,
      }

      // frame.contentWindow.postMessage(payload, origin)

      // const url = new URL(window.location.href)
      // const parentOrigin = url.searchParams.get('origin')

      // window.parent.postMessage({
      //   type: 'dashboard',
      //   payload: this.hero,
      // }, parentOrigin)
    },
    // receiveMessage(event) {
    //   const type = get(event, 'data.type')
    //   const payload = get(event, 'data.payload')

    //   if (type === 'dashboard') {
    //     this.hero = payload
    //   }
    // },
  },
  // mounted() {
  //   window.addEventListener('message', this.receiveMessage)
  // },
  // beforeDestroy() {
  //   window.removeEventListener('message', this.receiveMessage)
  // },
}
</script>

<template>
  <div>
    <h1>
      Dashboard component
    </h1>
    <template v-if="hero">
      <div>Try change hero</div>
      <input v-model="hero.title">
      <input v-model="hero.image">
    </template>
    <button @click="send">Apply</button>
  </div>
</template>
