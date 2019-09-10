<script>
export default {
  name: 'BaseLayout',
  props: {
    title: {
      type: String,
      default: '',
    },
    back: {
      type: [String, Object],
      default: null,
    },
  },
}
</script>

<template>
  <div class="base-layout">
    <div class="base-layout__header">
      <router-link
        v-if="back"
        :to="back"
      >
        <el-button
          class="base-layout__back"
          icon="el-icon-back"
          size="medium"
          plain
        />
      </router-link>
      <h1
        v-if="title"
        class="base-layout__title"
      >
        {{ title }}
      </h1>
      <slot name="header" />
    </div>
    <div class="base-layout__body">
      <slot />
    </div>
  </div>
</template>

<style lang="scss">
.base-layout {
  display: flex;
  flex-direction: column;
  width: rem(300px);
  height: 100vh;
  border-right: 1px solid var(--color-divider);

  &__header {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    height: var(--header-height);
    border-bottom: 1px solid var(--color-divider);
  }

  &__title {
    margin: 0;
    font-size: rem(20px);
  }

  &__back {
    font-size: rem(30px);
    border: none;
  }

  &__body {
    flex-grow: 1;
    padding: rem(16px);
    overflow-y: auto;
  }
}
</style>
