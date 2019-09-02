<script>
import applications from '@lib/applications'

export default {
  inheritAttrs: false,
  computed: {
    applications() {
      return applications
    },
  },
}
</script>

<template>
  <main-layout title="Dashboard">
    <template v-for="item in applications">
      <el-col
        v-if="!item.scope || $grant(item.scope)"
        :key="item.path"
        :class="[$style.appsItem, 'grid-content']"
      >
        <a :href="item.path">
          <el-card shadow="hover">
            <span slot="header">{{ item.label }}</span>
            <small>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </small>
          </el-card>
        </a>
      </el-col>
    </template>
  </main-layout>
</template>

<style lang="scss" module>

.appsItem {
  width: 20rem;
  padding: 10px;

  a {
    text-decoration: none;
  }

  small {
    opacity: .5;
  }

  :global(.el-card__body) {
    padding-top: 0;
  }
}
</style>
