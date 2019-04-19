<script>
export default {
  name: 'MainLayout',
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
    padding: .2rem !important;
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
  font-weight: var(--heading-font-weight);
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
