<script>
import cloneDeep from 'lodash/cloneDeep'
import templates from '~/widgets/templates'

export default {
  name: 'DashboardCreateWidget',
  computed: {
    templates() {
      return templates
    },
  },
  methods: {
    selectWidget(template) {
      this.$emit('select', cloneDeep(template.data))
    },
  },
}
</script>

<template>
  <base-layout
    class="dashboard-widget-create"
    title="Select new widget"
    popup
    @back="$emit('back')"
  >
    <base-block
      v-for="template in templates"
      :key="template.data.name"
      :title="template.label || template.data.name"
      @click="selectWidget(template)"
    >
      {{ template.description }}
    </base-block>
  </base-layout>
</template>
