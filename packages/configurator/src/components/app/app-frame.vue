<script>
import { mapGetters, mapMutations } from 'vuex'
import AdaptiveViewMixin from './adaptive-view.mixin.js'

export default {
  name: 'AppFrame',
  mixins: [AdaptiveViewMixin],
  computed: {
    ...mapGetters('exchange', ['connecting', 'frameUrl']),
    ...mapGetters('frame', ['showFrame', 'frameId', 'viewport']),
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
  <div :class="[$style.root, $style[viewport]]">
    <div
      ref="rootInner"
      :class="[$style.rootInner, { [$style.selectNone]: mouseDown }]"
    >
      <div
        v-show="isAdaptive"
        :class="$style.widthControl"
        data-side="left"
        @mousedown="onControlMousedown"
      />
      <iframe
        v-if="connecting || showFrame"
        :id="frameId"
        ref="iframe"
        :class="$style.frame"
        :src="frameUrl"
        sandbox="allow-same-origin allow-scripts"
        @load="onLoad"
      />
      <div
        v-show="isAdaptive"
        :class="$style.widthControl"
        data-side="right"
        @mousedown="onControlMousedown"
      />
    </div>
  </div>
</template>

<style lang="scss" module>
.root {
  width: 100%;
  height: calc(100vh - #{var(--header-height)});
  padding: rem(10px);
  margin: auto;
}

.rootInner {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.frame {
  box-sizing: content-box;
  width: 100%;
  height: 100%;
  border: 1px solid var(--color-text-light);
}

.mobile {
  width: rem(375px);
}

.tablet {
  box-sizing: content-box;
  width: rem(768px);
}

.widthControl {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: rem(24px);
  height: 100%;
  cursor: e-resize;
  background-color: var(--color-divider);
  opacity: 0.5;
  transition: opacity 0.15s ease;

  &:hover {
    opacity: 0.95;
  }

  &:before,
  &:after {
    width: 2px;
    height: 2rem;
    content: '';
    background-color: var(--color-text-light);
  }

  &:before {
    margin-right: 0.2rem;
  }
}

.selectNone {
  user-select: none;

  iframe {
    pointer-events: none;
  }
}
</style>
