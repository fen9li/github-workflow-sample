<script>

export default {
  name: 'MenuView',
  computed: {
    menu() {
      return [
        {
          title: 'Dashboard',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
          path: '/dashboard',
        },
        {
          title: 'Modules',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
          path: '/modules',
        },
        {
          title: 'Menu',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
          path: '/menu'
        }
      ]
    }
  },
}
</script>

<template>
  <div :class="$style.root">
    <router-link
      v-for="item in menu"
      :key="item.title"
      :to="item.path"
      :class="$style.item"
    >
      <h2 :class="$style.itemTitle">
        {{ item.title }}
      </h2>
      <p :class="$style.itemDescription">
        {{ item.description }}
      </p>
    </router-link>
  </div>
</template>

<style lang="scss" module>
.root {
  position: relative;
  padding: rem(0 20px);
}

.item {
  display: block;
  padding: rem(14px);
  color: var(--color-text) !important;
  cursor: pointer;
  border: 2px solid var(--color-divider);
  border-radius: rem(4px);

  &:hover {
    border-color: var(--color-primary);
  }

  + .item {
    margin-top: rem(16px);
  }
}

.itemTitle {
  margin: 0;
  font-size: rem(18px);
}

.itemDescription {
  margin-bottom: 0;
  font-size: rem(14px);
  color: var(--color-text-light);
}
</style>
