<script>
import AppProfile from '../profile/app-profile'

export default {
  components: {
    AppProfile,
  },
  inheritAttrs: false,
  props: {
    title: {
      type: String,
      default: '',
    },
    appCode: {
      type: String,
      default: '',
    },
  },
  computed: {
    applications() {
      return [
        {
          code: 'super',
          label: 'Super App',
          url: '/',
        },
        {
          code: 'payments',
          label: 'Payments',
          url: '/payments',
        },
      ]
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
        src="@assets/logo.png"
        alt=""
      >
      <span>{{ title }}</span>
    </router-link>
    <el-select
      :value="appCode"
      placeholder="Select Panel"
    >
      <el-option
        v-for="item in applications"
        :key="item.code"
        :label="item.label"
        :value="item.code"
      >
        <a
          class="app-header__link"
          :href="item.url"
        >{{ item.label }}</a>
      </el-option>
    </el-select>
    <app-profile />
  </div>
</template>

<style lang="scss">

.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;

  &__link {
    color: inherit !important;
    text-decoration: none;
  }

  &__logo {
    display: flex;
    align-items: center;
    font-size: 1.2rem;
    color: var(--text-color) !important;
    text-decoration: none;

    img,
    svg {
      display: block;
      max-height: 27px;
      margin-right: 1rem;
    }
  }
}
</style>
