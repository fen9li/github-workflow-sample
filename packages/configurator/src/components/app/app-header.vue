<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  name: 'AppHeader',
  computed: {
    ...mapGetters('exchange', [
      'ready',
      'url',
    ]),
    ...mapGetters('frame', [
      'viewport',
    ]),
    sizes() {
      return [
        { viewport: 'mobile', icon: 'mobile' },
        { viewport: 'tablet', icon: 'tablet' },
        { viewport: 'full', icon: 'desktop' },
        { viewport: 'adaptive', icon: 'adaptive' },
      ]
    },
  },
  methods: {
    ...mapActions('exchange', {
      reset: 'RESET',
    }),
    ...mapMutations('frame', {
      setViewport: 'SET_VIEWPORT',
    }),
  },
}
</script>

<template>
  <div :class="$style.root">
    <div :class="$style.left" />
    <div
      v-if="ready"
      :class="$style.center"
    >
      <el-button
        v-for="size in sizes"
        :key="size.viewport"
        :class="[
          $style.button,
          size.viewport === viewport && $style.selected,
        ]"
        @click="setViewport(size.viewport)"
      >
        <the-icon :svg="size.icon" />
      </el-button>
    </div>
    <div
      v-if="ready"
      :class="$style.right"
    >
      <div :class="$style.connected">
        Connected to <span :class="$style.url">{{ url }}</span>
      </div>
      <el-button
        :class="$style.change"
        type="text"
        @click="reset"
      >
        Change application
      </el-button>
    </div>
  </div>
</template>

<style lang="scss" module>
.root {
  display: flex;
  height: var(--header-height);
  border-bottom: 1px solid var(--color-divider);
}

.sizes {
  margin: auto;
}

.button {
  width: 40px;
  height: 40px;
  padding: 0;
  background: transparent !important;
  border: none;
}

.left,
.right {
  flex-basis: 30%;
  align-self: center;
  padding: 0 rem(24px);
}

.center {
  flex-basis: 40%;
  align-self: center;
  text-align: center;
  white-space: nowrap;
}

.right {
  text-align: right;
}

.connected {
  font-size: rem(14px);
}

.url {
  font-weight: bold;
}

.selected {
  color: var(--color-primary);
}

.change {
  padding: 0;
  margin: 0;
}
</style>
