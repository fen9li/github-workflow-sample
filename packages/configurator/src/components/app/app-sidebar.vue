<script>
import get from 'lodash/get'
import { mapGetters } from 'vuex'

export default {
  name: 'AppSidebar',
  computed: {
    ...mapGetters('dashboard', [
      'selectedWidget',
    ]),
    title() {
      const widgetName = get(this.selectedWidget, 'name', '')
      const routeTitle = this.$route.meta.title

      return widgetName || routeTitle
    },
  },
  methods: {
    back() {
      this.$router.back()
    }
  },
}
</script>

<template>
  <aside :class="$style.root">
    <div :class="$style.header">
      <template v-if="title">
        <el-button
          :class="$style.back"
          icon="el-icon-back"
          size="medium"
          plain
          @click="back"
        />
        <h1 :class="$style.title">
          {{ title }}
        </h1>
      </template>
      <img
        v-else
        :class="$style.logo"
        src="//loyaltycorp.com.au/wp-content/uploads/logo-lc.svg"
      >
    </div>
    <div :class="$style.body">
      <slot />
    </div>
  </aside>
</template>

<style lang="scss" module>
.root {
  display: flex;
  flex-direction: column;
  width: rem(300px);
  height: 100vh;
  border-right: 1px solid var(--color-divider);
}

.header {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  height: rem(64px);
  border-bottom: 1px solid var(--color-divider);
}

.title {
  margin: 0;
  font-size: rem(20px);
}

.back {
  font-size: rem(30px);
  border: none;
}

.body {
  flex-grow: 1;
  padding: rem(16px 0);
  overflow-y: auto;
}

.logo {
  max-width: rem(160px);
  height: 100%;
  margin: auto;
}
</style>
