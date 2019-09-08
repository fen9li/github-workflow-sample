<script>
import { mapGetters } from 'vuex'
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
}
</script>

<template>
  <div :class="$style.root">
    <div :class="$style.widgets">
      <dashboard-item
        v-for="(widget, idx) in widgets"
        :key="`${widget.name}-${idx}`"
        :widget="widget"
      />
    </div>
  </div>
</template>

<style lang="scss" module>
.root {
  position: relative;
}

.widgets {
  padding: 0 rem(16px);
}
</style>
