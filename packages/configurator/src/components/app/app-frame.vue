<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'AppFrame',
  computed: {
    ...mapGetters('exchange', [
      'ready',
      'connected',
      'connecting',
      'frameUrl',
      'showFrame',
    ]),
  },
  methods: {
    ...mapMutations('exchange', {
      setConnectedStatus: 'SET_CONNECTED_STATUS',
    }),
    onLoad() {
      this.setConnectedStatus()
    },
  },
}
</script>

<template>
  <iframe
    v-if="connecting || showFrame"
    v-show="showFrame"
    id="app-frame"
    ref="frame"
    :class="$style.root"
    :src="frameUrl"
    @load="onLoad"
  />
</template>

<style lang="scss" module>

.root {
  width: 100%;
  height: 100%;
  border: none;
}
</style>
