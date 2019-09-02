<script>
export default {
  inheritAttrs: false,
  props: {
    menu: {
      type: Array,
      default: () => [],
    },
    linkClickOpen: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      expanded: this.$route.meta.nested,
    }
  },
  watch: {
    $route(route) {
      if (route.meta.nested) {
        this.expanded = true
      }
    },
  },
  methods: {
    onExpand(children) {
      if (children && children.length) {
        this.expanded = !this.expanded
      }
    },
    activeClass(slug) {
      if (this.$route.params.slug === slug) {
        return 'menu__item--active'
      }
      return ''
    },
    getOpenEvent(value) {
      return value ? 'click' : null
    }
  },
}
</script>

<template>
  <div class="app-sidebar">
    <div class="app-sidebar__wrapper">
      <ul class="menu">
        <template v-for="item in menu">
          <template v-if="item.children">
            <li
              :key="item.path"
              :class="['menu__item', expanded && 'menu__item--expanded']"
              @[getOpenEvent(linkClickOpen)]="onExpand(item.children)"
            >
              <router-link
                :to="{ path: item.path }"
                class="menu__link"
              >
                <i :class="`el-icon-${item.icon}`" />
                {{ item.title }}
                <i
                  :class="{ 'menu__expand--disabled': !item.children.length }"
                  class="el-icon-arrow-down menu__expand"
                  @[getOpenEvent(!linkClickOpen)].prevent="onExpand(item.children)"
                />
              </router-link>
              <ul class="submenu">
                <router-link
                  v-for="children in item.children"
                  :key="children.path"
                  :to="{ path: children.path }"
                  tag="li"
                  :class="['menu__item', activeClass(children.slug)]"
                  @click.native="$event.stopImmediatePropagation()"
                >
                  <a class="menu__link">
                    {{ children.title }}
                  </a>
                </router-link>
              </ul>
            </li>
          </template>
          <template v-else>
            <router-link
              :key="item.path"
              :to="{ path: item.path }"
              tag="li"
              class="menu__item"
              :exact="item.path === '/'"
            >
              <a class="menu__link">
                <the-icon
                  v-if="item.svg"
                  :svg="item.svg"
                  class="menu__svg"
                />
                <el-icon
                  v-else
                  :name="item.icon"
                />
                {{ item.title }}
              </a>
            </router-link>
          </template>
        </template>
      </ul>
    </div>
  </div>
</template>

<style lang="scss">
/* stylelint-disable no-descending-specificity */

.app-sidebar {
  width: 100%;
  height: 100%;
  padding: 1.6rem 0;
  overflow-y: auto;
  background: linear-gradient(to bottom, #1681ee, #47a1f7);
  border: none;

  .menu,
  .submenu {
    padding: 0;
    margin: 0;
    list-style: none;

    [class^='el-icon-'] {
      margin-right: 0.6rem;
      color: var(--color-primary-text);
    }
  }

  .menu__item {
    position: relative;
  }

  .menu__svg {
    margin-right: 0.6rem;
    font-size: rem(16px);
  }

  .menu__link {
    display: flex;
    align-items: center;
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    color: var(--color-primary-text);
    cursor: pointer;
    transition: background-color 0.15s;

    &:hover,
    &:focus,
    &:active {
      background-color: rgba(#fff, 0.1);
    }
  }

  .menu__item--active {
    background-color: rgba(#fff, 0.15);
  }

  .submenu {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.5s cubic-bezier(0, 1, 0, 1);

    .menu__link {
      padding-left: 5rem;
      margin-bottom: 0;
    }
  }

  .menu__item--expanded .submenu {
    max-height: 1000px;
    transition: max-height 1s ease-in-out;
  }

  .menu__item .el-icon-arrow-down {
    position: absolute;
    top: 0.9rem;
    right: 1.25rem;
    padding-right: 10px;
    padding-left: 10px;
    font-weight: bold;
    transition: transform 0.5s cubic-bezier(0, 1, 0, 1);
    transform: rotate(0);
  }

  .menu__item--expanded .el-icon-arrow-down {
    transform: rotate(180deg);
  }

  .menu__expand {
    transition: opacity .3s ease-in-out;
  }

  .menu__expand--disabled {
    cursor: wait;
    opacity: 0.5;
  }
}
</style>
