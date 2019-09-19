<script>
export default {
  name: 'BaseLayout',
  props: {
    title: {
      type: String,
      default: '',
    },
    back: {
      type: [String, Object, Boolean],
      default: () => ({}),
    },
    popup: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<template>
  <div
    :class="[
      'base-layout',
      popup && 'base-layout--popup',
    ]"
  >
    <div
      v-if="back || title"
      class="base-layout__header"
    >
      <router-link
        v-if="back"
        :to="back"
        @click.native="$emit('back')"
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
    </div>
    <div class="base-layout__body">
      <slot />
    </div>
  </div>
</template>

<style lang="scss">
.base-layout {
  position: relative;
  display: flex;
  flex-direction: column;
  width: rem(300px);
  max-width: 100%;
  height: 100%;
  border-right: 1px solid var(--color-divider);

  &--popup {
    position: absolute;
    top: 0;
    left: 0;
    background: white;
  }

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
