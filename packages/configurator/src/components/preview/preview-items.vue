<script>
import get from 'lodash/get'
import PreviewMixin from '~/widgets/preview.mixin'

export default {
  name: 'PreviewItems',
  mixins: [PreviewMixin],
  computed: {
    items() {
      return get(this.config, 'props.items', [])
    },
    textCount() {
      const count = this.items.length

      if (count === 1) {
        return `${count} record`
      } else if (count > 1) {
        return `${count} records`
      }

      return 'No records'
    },
    visible() {
      return get(this.config, 'props.items', false)
    },
  },
}
</script>

<template>
  <div
    v-if="visible"
    class="preview-tiles"
  >
    <span>{{ textCount }}</span>
    <span
      v-for="(item, idx) in items"
      :key="idx"
    >
      <preview-content :config="item" />
    </span>
  </div>
</template>
