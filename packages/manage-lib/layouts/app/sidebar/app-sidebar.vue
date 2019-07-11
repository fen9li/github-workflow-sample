<script>
export default {
  inheritAttrs: false,
  props: {
    menu: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      expanded: this.$route.meta.nested,
    }
  },
  watch: {
    '$route'(route) {
      if (route.meta.nested) {
        this.expanded = true
      }
    },
  },
  methods: {
    onExpand() {
      this.expanded = !this.expanded
    },
    activeClass(slug) {
      if (this.$route.params.slug === slug) {
        return 'menu__item--active'
      }
      return ''
    },
  },
}
</script>

<template>
  <div class="app-sidebar">
    <div class="app-sidebar__wrapper">
      <ul class="menu">
        <template v-for="item in menu">
          <template v-if="item.children && item.children.length">
            <li
              :key="item.path"
              :class="[
                'menu__item',
                expanded && 'menu__item--expanded'
              ]"
            >
              <router-link
                :to="{ path: item.path }"
                class="menu__link"
              >
                <i :class="`el-icon-${item.icon}`" />
                {{ item.title }}
                <i

                  class="el-icon-arrow-down"
                  @click.prevent="onExpand"
                />
              </router-link>
              <ul class="submenu">
                <router-link
                  v-for="children in item.children"
                  :key="children.path"
                  :to="{ path: children.path }"
                  tag="li"
                  :class="[
                    'menu__item',
                    activeClass(children.slug)
                  ]"
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
            >
              <a class="menu__link">
                <el-icon :name="item.icon" />
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
  width: 300px;
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
      margin-right: .6rem;
      color: var(--color-primary-text);
    }
  }

  .menu__item {
    position: relative;
  }

  .menu__link {
    display: block;
    padding: .75rem 1.5rem;
    font-size: 1rem;
    color: var(--color-primary-text);
    cursor: pointer;
    transition: background-color .15s;

    &:hover,
    &:focus,
    &:active {
      background-color: rgba(#fff, .1);
    }
  }

  .menu__item--active {
    background-color: rgba(#fff, .15);
  }

  .submenu {
    max-height: 0;
    overflow: hidden;
    transition: max-height .5s cubic-bezier(0, 1, 0, 1);

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
    top: .9rem;
    right: 1.25rem;
    padding-right: 10px;
    padding-left: 10px;
    font-weight: bold;
    transition: transform .5s cubic-bezier(0, 1, 0, 1);
    transform: rotate(0);
  }

  .menu__item--expanded .el-icon-arrow-down {
    transform: rotate(180deg)
  }
}
</style>
