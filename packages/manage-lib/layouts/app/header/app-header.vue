<script>
import AppProfile from '../profile/app-profile'
import applications from '../../../applications.json'

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
      return applications
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
        src="@/assets/logo.png"
        alt=""
      >
      <span>{{ title }}</span>
    </router-link>
    <el-select
      v-if="appCode !== 'payments'"
      :value="$auth.config.label"
      placeholder="Select Panel"
    >
      <template v-for="item in applications">
        <a
          v-if="!item.scope || $grant(item.scope)"
          :key="item.code"
          :href="item.path"
          class="app-header__link"
        >
          <el-option
            :label="item.label"
            :value="item.label"
          >
            {{ item.label }}
          </el-option>
        </a>
      </template>
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
