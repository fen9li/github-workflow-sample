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
    <base-menu-link
      v-for="item in menu"
      :key="item.title"
      :to="item.path"
      :title="item.title"
      :description="item.description"
    />
  </div>
</template>

<style lang="scss" module>
.root {
  position: relative;
  padding: rem(0 12px);
}
</style>
