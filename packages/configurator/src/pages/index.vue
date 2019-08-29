<script>
export default {
  name: 'Home',
  data() {
    return {
      iframe: false,
      appUrl: 'https://localhost:8080',
    }
  },
  computed: {
    frameUrl() {
      const origin = window.location.origin

      return `${this.appUrl}?origin=${origin}`
    },
  },
  methods: {
    loadApp() {
      this.iframe = true
      this.$router.push('/dashboard')
    },
  },
}
</script>

<template>
  <main :class="$style.root">
    <div :class="$style.sidebar">
      <nuxt-child />
    </div>
    <div :class="$style.app">
      <template v-if="iframe">
        <iframe
          id="app-frame"
          :class="$style.frame"
          :src="frameUrl"
        />
      </template>
      <template v-else>
        <input v-model="appUrl">
        <button @click="loadApp">Load App</button>
      </template>
    </div>
  </main>
</template>

<style lang="scss" module>
.root {
  display: flex;
  width: 100vw;
  height: 100vh;
}

.sidebar {
  width: 300px;
  border-right: 1px solid var(--color-divider);
}

.app {
  flex-grow: 1;
}

.frame {
  width: 1px;
  width: 100%;
  height: 100%;
  border: none;
}
</style>
