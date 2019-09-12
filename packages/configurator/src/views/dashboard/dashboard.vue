<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import DashboardCreateWidget from './dashboard-create-widget'

export default {
  name: 'DashboardView',
  components: {
    DashboardCreateWidget,
  },
  data: () => ({
    insertBy: null,
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
      this.addWidget({
        index: this.insertBy + 1,
        config: template,
        select: true,
      })
      this.insertBy = null
      this.$router.push({
        name: 'dashboard-widget',
      })
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
      <router-link
        :key="`${widget.name}-${idx}`"
        :class="$style.link"
        to="/dashboard/widget"
      >
        <base-block-editable
          :title="widget.title"
          @click.capture="selectWidget(widget)"
          @down="moveWidgetDown(widget)"
          @up="moveWidgetUp(widget)"
          @delete="deleteWidget(widget)"
        >
          <component
            :is="widget.preview"
            :config="widget.config"
          />
        </base-block-editable>
      </router-link>
      <el-button
        :key="`add-${idx}`"
        :class="$style.add"
        icon="el-icon-plus"
        @click="insertBy = idx"
      />
    </template>

    <dashboard-create-widget
      v-if="insertBy !== null"
      @back="insertBy = null"
      @select="onSelectTemplate"
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

.link {
  color: inherit;
}
</style>
