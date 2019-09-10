<script>
import get from 'lodash/get'
import { mapGetters } from 'vuex'

export default {
  name: 'DashboardWidget',
  computed: {
    ...mapGetters('dashboard', [
      'selectedWidget',
    ]),
    title() {
      const title = get(this.selectedWidget, 'title', '')
      return title ? `${title} Widget` : 'Widget'
    }
  },
}
</script>

<template>
  <base-layout
    :title="title"
    back="/dashboard"
  >
    <component
      :is="selectedWidget.builder"
      v-if="selectedWidget"
      :widget="selectedWidget"
    />
  </base-layout>
</template>
