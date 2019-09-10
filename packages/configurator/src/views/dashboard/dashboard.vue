<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'DashboardView',
  computed: {
    ...mapGetters('dashboard', [
      'widgets',
    ]),
  },
  methods: {
    ...mapMutations('dashboard', {
      moveWidgetUp: 'MOVE_WIDGET_UP',
      moveWidgetDown: 'MOVE_WIDGET_DOWN',
      deleteWidget: 'DELETE_WIDGET',
      selectWidget: 'SELECT_WIDGET',
    }),
  },
}
</script>

<template>
  <base-layout
    title="Dashboard"
    back="/home"
  >
    <template v-for="(widget, idx) in widgets">
      <base-menu-link
        :key="`${widget.name}-${idx}`"
        :title="widget.title"
        to="/dashboard/widget"
        @click.native="selectWidget(widget)"
      >
        <template slot="actions">
          <el-button
            icon="el-icon-arrow-down"
            @click.stop.prevent="moveWidgetDown(widget)"
          />
          <el-button
            icon="el-icon-arrow-up"
            @click.stop.prevent="moveWidgetUp(widget)"
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
      <el-button
        :key="`add-${idx}`"
        :class="$style.add"
        icon="el-icon-plus"
      />
    </template>
  </base-layout>
</template>

<style lang="scss" module>
.add {
  display: block;
  width: 100%;
  padding: 4px 0;
  border: none;
}
</style>
