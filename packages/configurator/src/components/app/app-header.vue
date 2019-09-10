<script>
import { mapMutations, mapGetters } from 'vuex'

export default {
  name: 'AppHeader',
  computed: {
    ...mapGetters('exchange', [
      'ready',
    ]),
    ...mapGetters('frame', [
      'viewport',
    ]),
    sizes() {
      return [
        { viewport: 'mobile', icon: 'mobile' },
        { viewport: 'tablet', icon: 'tablet' },
        { viewport: 'full', icon: 'desktop' },
      ]
    },
  },
  methods: {
    ...mapMutations('frame', {
      setViewport: 'SET_VIEWPORT',
    }),
  },
}
</script>

<template>
  <div :class="$style.root">
    <div
      v-if="ready"
      :class="$style.sizes"
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

.selected {
  color: var(--color-primary);
}
</style>
