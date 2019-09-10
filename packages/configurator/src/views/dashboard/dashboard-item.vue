<script>
import { mapMutations } from 'vuex'

export default {
  name: 'DashboardItem',
  props: {
    widget: {
      type: Object,
      required: true,
    },
  },
  methods: {
    ...mapMutations('dashboard', {
      moveUp: 'MOVE_WIDGET_UP',
      moveDown: 'MOVE_WIDGET_DOWN',
      deleteWidget: 'DELETE_WIDGET',
    }),
  },
}
</script>

<template>
  <base-menu-link
    :title="widget.title"
    to="/dashboard/widget"
  >
    <template slot="actions">
      <el-button
        icon="el-icon-arrow-down"
        @click.stop.prevent="moveDown(widget)"
      />
      <el-button
        icon="el-icon-arrow-up"
        @click.stop.prevent="moveUp(widget)"
      />
      <el-button
        icon="el-icon-delete"
        @click.stop.prevent="deleteWidget(widget)"
      />
    </template>
    <component
      :is="widget.preview"
      :config="widget.config"
    />
  </base-menu-link>
</template>

<style lang="scss" module>
.root {
  position: relative;
  border-top: 1px solid var(--color-divider);
}
</style>
