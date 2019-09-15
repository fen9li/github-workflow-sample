<script>
import get from 'lodash/get'
import Widget from '~/widgets/widget'
import { getItemTemplate } from '~/widgets/templates'
import BuilderElement from './builder-element.mixin'

export default {
  name: 'BuilderItems',
  mixins: [BuilderElement],
  props: {
    meta: {
      type: Object,
      default: null,
    },
  },
  data: () => ({
    widgets: [],
    insertBy: null,
    selectedWidget: null,
  }),
  computed: {
    empty() {
      return get(this.widgets, 'length', 0) === 0
    },
  },
  created() {
    this.initWidgets()
    this.$watch('widgets', () => {
      this.build()
    })
  },
  methods: {
    initWidgets() {
      if (this.value instanceof Array && this.meta) {
        this.value.forEach(item => {
          this.addWidget({
            config: item,
          })
        })
      }
    },
    addWidget({ index, config }) {
      const widget = new Widget({
        config,
        key: `${this.widgets.length}_${Date.now()}`,
        meta: this.meta,
      })

      if (index >= 0) {
        this.widgets.splice(index, 0, widget)
      } else {
        this.widgets.push(widget)
      }

      return widget
    },
    insertWidget(index) {
      const parent = get(this.meta, 'parent')

      if (!parent) {
        return console.warn('item has no template')
      }

      const widget = this.addWidget({
        index: index + 1,
        config: getItemTemplate(parent)
      })

      this.selectWidget(widget)
    },
    selectWidget(widget) {
      this.selectedWidget = widget
    },
    deleteWidget(widget) {
      const { widgets } = this
      const index = widgets.indexOf(widget)

      widgets.splice(index, 1)
    },
    moveWidgetUp(widget) {
      const { widgets } = this
      const index = widgets.indexOf(widget)

      if (index > 0) {
        const prev = widgets[index - 1]
        widgets.splice(index - 1, 2, widget, prev)
      }
    },
    moveWidgetDown(widget) {
      const { widgets } = this
      const index = widgets.indexOf(widget)

      if (index + 1 < widgets.length) {
        const next = widgets[index + 1]
        widgets.splice(index, 2, next, widget)
      }
    },
    build() {
      const config = this.widgets.map(widget => {
        return widget.build()
      })

      this.onInput(config)
    },
  },
}
</script>

<template>
  <div class="builder-items form-element">
    <div class="block-label">
      Items
    </div>

    <template v-if="empty">
      No items
    </template>
    <template v-else>
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
          @click="insertWidget(idx)"
        />
      </template>
      <base-layout
        v-if="selectedWidget"
        :title="selectedWidget.title"
        popup
        @back="selectedWidget = null"
      >
        <component
          :is="selectedWidget.builder"
          :widget="selectedWidget"
          @build="build()"
        />
      </base-layout>
    </template>
  </div>
</template>

<style lang="scss" module>
.add {
  display: block;
  width: 100%;
  padding: 4px 0;
  border: none;
}
</style>
