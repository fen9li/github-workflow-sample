<script>
import capitalize from 'lodash/capitalize'
import { mapMutations } from 'vuex'

export default {
  name: 'DashboardItem',
  props: {
    widget: {
      type: Object,
      required: true,
    },
  },
  computed: {
    title() {
      return capitalize(this.widget.name)
    },
  },
  methods: {
    ...mapMutations('dashboard', {
      moveUp: 'MOVE_WIDGET_UP',
      moveDown: 'MOVE_WIDGET_DOWN',
    }),
  },
}
</script>

<template>
  <base-menu-link
    :title="title"
  >
    <template slot="actions">
      <el-button
        icon="el-icon-arrow-down"
        @click.stop="moveDown(widget)"
      />
      <el-button
        icon="el-icon-arrow-up"
        @click.stop="moveUp(widget)"
      />
    </template>
    <component
      :is="widget.preview"
      :config="widget.data"
    />
  </base-menu-link>
</template>

<style lang="scss" module>
.root {
  position: relative;
  border-top: 1px solid var(--color-divider);
}
</style>
