<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import DashboardWidgetCreate from './dashboard-widget-create'
import DashboardWidgetBuild from './dashboard-widget-build'

export default {
  name: 'DashboardView',
  components: {
    DashboardWidgetCreate,
    DashboardWidgetBuild,
  },
  data: () => ({
    insertBy: null,
    selectedWidget: null,
  }),
  computed: {
    ...mapGetters('dashboard', [
      'widgets',
    ]),
  },
  watch: {
    widgets() {
      this.sendConfig()
    },
  },
  methods: {
    ...mapActions('dashboard', {
      sendConfig: 'SEND_CONFIG',
    }),
    ...mapMutations('dashboard', {
      moveWidgetUp: 'MOVE_WIDGET_UP',
      moveWidgetDown: 'MOVE_WIDGET_DOWN',
      deleteWidget: 'DELETE_WIDGET',
      selectWidget: 'SELECT_WIDGET',
      addWidget: 'ADD_WIDGET',
    }),
    onSelectTemplate(template) {
      const index = this.insertBy + 1

      this.addWidget({
        index,
        config: template,
      })
      this.insertBy = null

      const widget = this.widgets[index]

      if (widget) {
        this.selectWidget(widget)
      }
    },
    selectWidget(widget) {
      this.selectedWidget = widget
    },
  },
}
</script>

<template>
  <base-layout
    title="Dashboard"
    back="/home"
  >
    <template v-for="(widget, idx) in widgets">
      <base-block-editable
        :key="widget.key"
        :title="widget.title"
        @click="selectWidget(widget)"
        @down="moveWidgetDown(widget)"
        @up="moveWidgetUp(widget)"
        @delete="deleteWidget(widget)"
      >
        <component
          :is="widget.preview"
          :config="widget.config"
        />
      </base-block-editable>
      <el-button
        :key="`${widget.key}_add`"
        :class="$style.add"
        icon="el-icon-plus"
        @click="insertBy = idx"
      />
    </template>

    <dashboard-widget-create
      v-if="insertBy !== null"
      @back="insertBy = null"
      @select="onSelectTemplate"
    />
    <dashboard-widget-build
      v-else-if="selectedWidget"
      :widget="selectedWidget"
      @back="selectedWidget = null"
      @build="sendConfig()"
    />
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
