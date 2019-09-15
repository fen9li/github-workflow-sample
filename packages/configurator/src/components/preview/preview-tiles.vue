<script>
import get from 'lodash/get'
import PreviewMixin from '~/widgets/preview.mixin'

export default {
  name: 'PreviewTiles',
  mixins: [PreviewMixin],
  computed: {
    textCount() {
      const count = get(this.config, 'props.items.length', 0)

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
  </div>
</template>
