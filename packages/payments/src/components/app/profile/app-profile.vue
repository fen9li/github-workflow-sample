<script>
import { mapGetters } from 'vuex'

export default {
  name: 'HeaderProfile',
  computed: {
    ...mapGetters('auth', [
      'profile',
    ]),
    auth() {
      return this.$auth
    },
    name() {
      return this.auth.profile
    },
    initial() {
      return 'NBdd'
    },
  },
}
</script>

<template>
  <el-popover
    v-if="profile"
    class="header-profile"
    placement="bottom-end"
    width="200"
    trigger="click"
  >
    <div
      slot="reference"
      class="header-profile__trigger"
    >
      <span class="header-profile__item">
        {{ profile.name }}
      </span>
      <span class="header-profile__avatar">
        <img
          :src="profile.picture"
          :alt="profile.name"
        >
      </span>
    </div>
    <el-col class="header-profile__menu">
      <button @click="$auth.logout()">
        Logout
      </button>
    </el-col>
  </el-popover>
</template>

<style lang="scss">
@import '@design';

.header-profile {
  &__trigger {
    display: flex;
    align-items: center;
    height: 100%;
    line-height: 36px;
    cursor: pointer;
  }

  &__item {
    + .header-profile__item {
      border-left: 1px solid $color-text;
    }
  }

  &__avatar {
    display: inline-block;
    width: 34px;
    height: 34px;
    margin-left: 20px;
    overflow: hidden;
    font-size: 12px;
    font-weight: 900;
    line-height: 36px;
    color: $primary-text;
    text-align: center;
    background-image: linear-gradient(180deg, $primary-light 0%, #09bdfe 100%);
    border-radius: 50%;

    img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
}
</style>
