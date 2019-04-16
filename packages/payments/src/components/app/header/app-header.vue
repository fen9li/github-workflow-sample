<script>
import { mapState } from 'vuex'
import { authComputed } from '@state/helpers'
import AppProfile from '../profile/app-profile'

export default {
  components: {
    AppProfile,
  },
  data() {
    return {}
  },
  computed: {
    ...authComputed,
    ...mapState('ui', ['headroom']),
    // false - default headroom behavour
    // true - header fixed on top
    disabledHeadroom() {
      return !this.headroom || !this.headroom.enabled
    },
    // true - header on top of page, not screen if headroom disabled
    staticHeadroom() {
      return this.disabledHeadroom && (!this.headroom || this.headroom.static)
    },
  },
}
</script>

<template>
  <div class="app-header">
    <router-link
      to="/"
      class="app-header__logo"
    >
      <img
        src="@assets/logo.jpg"
        alt="Logo EONX"
      >
    </router-link>
    <app-profile />
  </div>
</template>

<style lang="scss">
@import '@design';

.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;

  &__logo {
    display: flex;

    img,
    svg {
      display: block;
      max-height: 27px;
    }
  }
}
</style>
