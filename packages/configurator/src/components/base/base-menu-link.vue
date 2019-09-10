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
  <router-link
    :to="to"
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
  </router-link>
</template>

<style lang="scss" module>
.root {
  display: block;
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
  min-height: rem(48px);
  padding: rem(0 14px);
}

.actions {
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

.title {
  margin: 0;
  overflow: hidden;
  font-size: rem(18px);
  text-overflow: ellipsis;
  white-space: nowrap;
}

.body {
  padding: rem(0 14px 14px);
  font-size: rem(14px);
  color: var(--color-text-light);

  p {
    margin: 0;
  }
}

.description {
  margin-bottom: 0;
}
</style>
