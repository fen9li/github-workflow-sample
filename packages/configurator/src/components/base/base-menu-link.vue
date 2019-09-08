<script>
export default {
  name: 'BaseMenuLink',
  props: {
    title: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    to: {
      type: String,
      default: '',
    },
  },
}
</script>

<template>
  <component
    :is="to ? 'router-link' : 'div'"
    :to="to || null"
    :class="$style.root"
  >
    <div :class="$style.header">
      <h2 :class="$style.title">
        {{ title }}
      </h2>
      <div :class="$style.actions">
        <slot name="actions" />
      </div>
    </div>
    <div :class="$style.body">
      <p
        v-if="description"
        :class="$style.description"
      >
        {{ description }}
      </p>
      <slot />
    </div>
  </component>
</template>

<style lang="scss" module>
.root {
  display: block;
  padding: rem(14px);
  color: var(--color-text) !important;
  cursor: pointer;
  border: 2px solid var(--color-divider);
  border-radius: rem(4px);

  &:hover {
    border-color: var(--color-primary);
  }

  + .root {
    margin-top: rem(12px);
  }
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.actions {
  flex-wrap: nowrap;

  button {
    padding: rem(4px);
    margin: 0 !important;
    font-size: 18px;
    border: none;
  }
}

.title {
  margin: 0;
  font-size: rem(18px);
}

.body {
  margin-top: rem(8px);
  font-size: rem(14px);
  color: var(--color-text-light);
}

.description {
  margin-bottom: 0;
}
</style>
