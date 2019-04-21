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
  <div :class="$style.root">
    <div :class="$style.apps">
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
    </div>
  </div>
</template>

<style lang="scss" module>

.apps {
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
}

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
