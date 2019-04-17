<script>
export default {
  name: 'AppLayout',
  inheritAttrs: false,
  props: {
    back: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
    tabs: {
      type: Array,
      default: null,
    },
    menu: {
      type: Array,
      default: null,
    },
  },
  computed: {
    activeTabKey() {
      return this.$route.name
    },
  },
  methods: {
    onBackClick() {
      this.$router.go(-1)
    },
  },
}
</script>

<template>
  <div :class="$style.layout">
    <div :class="$style.header">
      <div :class="$style.headerTop">
        <el-button
          v-if="back"
          :class="$style.backButton"
          circle
          icon="el-icon-arrow-left"
          @click="onBackClick"
        />
        <h1 :class="$style.headerTitle">
          {{ title }}
        </h1>
        <div style="flex-grow: 1" />
        <div :class="$style.headerSlot">
          <slot name="header" />
        </div>
      </div>
      <div :class="$style.headerBottom">
        <el-tabs
          v-if="tabs"
          slot="subheader"
          :class="$style.tabs"
          :value="activeTabKey"
        >
          <el-tab-pane
            v-for="tab in tabs"
            :key="tab.key || tab.route.name"
            :name="tab.key || tab.route.name"
          >
            <router-link
              slot="label"
              :class="$style.tab"
              :to="tab.route"
            >
              {{ tab.label }}
            </router-link>
          </el-tab-pane>
        </el-tabs>

        <slot name="subheader" />
      </div>
    </div>
    <div :class="$style.body">
      <div
        v-if="menu"
        class="app-sidebar"
      >
        <div class="app-sidebar__wrapper">
          <el-menu
            :default-active="$route.path"
            :router="true"
          >
            <template v-for="item in menu">
              <el-submenu
                v-if="item.children && item.children.length"
                :key="item.path"
                :index="item.path"
              >
                <template slot="title">
                  <i
                    v-if="item.icon"
                    :class="'el-icon-' + item.icon"
                  />
                  <span>{{ item.title }}</span>
                </template>
                <el-menu-item
                  v-for="subitem in item.children"
                  :key="subitem.path"
                  :index="subitem.path"
                >
                  {{ subitem.title }}
                </el-menu-item>
              </el-submenu>
              <el-menu-item
                v-else
                :key="item.path"
                :index="item.path"
              >
                <i
                  v-if="item.icon"
                  :class="'el-icon-' + item.icon"
                />
                <span>{{ item.title }}</span>
              </el-menu-item>
            </template>
          </el-menu>
        </div>
      </div>
      <slot />
    </div>
  </div>
</template>

<style lang="scss" module>
@import '@design';

.layout {
  width: 100%;
}

.header,
.body {
  padding: 0 2rem;
}

.body {
  padding-bottom: 2rem;
}

.header {
  flex-wrap: wrap;
}

.headerTop {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 5rem;

  .backButton {
    position: absolute;
    left: 0;
    padding: .2rem;
    border-color: $primary;
    border-width: 2px;

    i {
      font-size: 1.2rem;
      font-weight: bold;
      color: $primary;
    }
  }
}

.headerTitle {
  margin: 0;
  font-size: 1.5rem;
  font-weight: $heading-font-weight;
}

.headerSlot {
  flex-shrink: 0;
}

.headerTop,
.headerBottom {
  width: 100%;
  padding: 0 3rem;
}

.tabs {
  margin-bottom: 1.5rem;
}

.tab {
  display: block;
  height: 100%;
  color: inherit !important;
  text-decoration: none;
}
</style>

<style lang="scss">
/* stylelint-disable no-descending-specificity */
@import '@design';

.app-sidebar {
  width: 260px;
  height: 100%;
  padding: 1rem 0;
  overflow-y: auto;
  background: $color-aside-bg;
  border: none;

  .el-menu {
    background: transparent;
    border-right: 0;

    [class*=' el-icon-'],
    [class^='el-icon-'] {
      color: $primary-text !important;
    }

    &-item {
      color: $primary-text !important;

      &:hover,
      &:focus,
      &:active {
        background-color: rgba(255, 255, 255, 0.1);
      }
    }
  }

  .el-menu, .el-submenu {

    [class^="el-icon-"] {
      margin-right: .6rem;
    }
  }

  .el-menu-item, .el-submenu__title {
    display: flex;
    align-items: center;
    font-size: 1rem;
    font-weight: 300;
  }

  .el-submenu {

    &__title {
      color: $primary-text;

      &:hover,
      &:focus,
      &:active {
        background-color: rgba(255, 255, 255, 0.1);
      }
    }

    .el-menu-item {
      padding-left: 75px !important;
    }
  }
}
</style>
