<script>
import get from 'lodash/get'

export default {
  name: 'DashboardWidget',
  props: {
    widget: {
      type: Object,
      default: null,
    },
  },
  computed: {
    title() {
      return get(this.widget, 'title', 'Widget')
    }
  },
}
</script>

<template>
  <base-layout
    :title="title"
    class="dashboard-widget-build"
    popup
    @back="$emit('back')"
  >
    <component
      :is="widget.builder"
      :widget="widget"
      @build="$emit('build')"
    />
  </base-layout>
</template>
