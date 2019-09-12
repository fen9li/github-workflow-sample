<script>
export default {
  name: 'BaseBlock',
  props: {
    title: {
      type: String,
      default: '',
    },
  },
}
</script>

<template>
  <div
    class="base-block"
    v-on="$listeners"
  >
    <div class="base-block__header">
      <h2 class="base-block__title">
        {{ title }}
      </h2>
      <div class="base-block__actions">
        <slot name="actions" />
      </div>
    </div>
    <div class="base-block__body">
      <slot />
    </div>
  </div>
</template>

<style lang="scss">
.base-block {
  display: block;
  color: var(--color-text) !important;
  cursor: pointer;
  border: 2px solid var(--color-divider);
  border-radius: rem(4px);

  &:hover {
    border-color: var(--color-primary);
  }

  + .base-block {
    margin-top: rem(12px);
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: rem(48px);
    padding: rem(0 14px);
  }

  &__actions {
    flex-shrink: 0;
    flex-wrap: nowrap;
    margin-left: 1rem;

    button {
      padding: rem(4px);
      margin: 0 !important;
      font-size: 18px;
      border: none;
    }
  }

  &__title {
    margin: 0;
    overflow: hidden;
    font-size: rem(18px);
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__body {
    padding: rem(0 14px 14px);
    font-size: rem(14px);
    color: var(--color-text-light);

    p {
      margin: 0;
    }
  }
}
</style>
