<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'AppFrame',
  computed: {
    ...mapGetters('exchange', [
      'connecting',
      'frameUrl',
    ]),
    ...mapGetters('frame', [
      'showFrame',
      'frameId',
      'viewport',
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
  <div
    :class="[
      $style.root,
      $style[viewport],
    ]"
  >
    <iframe
      v-if="connecting || showFrame"
      :id="frameId"
      :class="$style.frame"
      :src="frameUrl"
      sandbox="allow-same-origin allow-scripts"
      @load="onLoad"
    />
  </div>
</template>

<style lang="scss" module>
.root {
  width: 100%;
  height: calc(100vh - #{var(--header-height)});
  padding: rem(10px);
  margin: auto;
}

.frame {
  width: 100%;
  height: 100%;
  border: 1px solid var(--color-text-light);
}

.mobile {
  width: rem(375px);
}

.tablet {
  width: rem(768px);
}
</style>
