<script>
import { mapGetters, mapMutations } from 'vuex'
import DashboardItem from './dashboard-item'

export default {
  name: 'DashboardView',
  components: {
    DashboardItem,
  },
  computed: {
    ...mapGetters('dashboard', [
      'widgets',
    ]),
  },
  methods: {
    ...mapMutations('dashboard', {
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
      <dashboard-item
        :key="`${widget.name}-${idx}`"
        :widget="widget"
        @click.native="selectWidget(widget)"
      />
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
