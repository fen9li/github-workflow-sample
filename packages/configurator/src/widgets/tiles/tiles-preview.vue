<script>
import PreviewMixin from '../preview.mixin'

export default {
  name: 'TilesPreview',
  mixins: [PreviewMixin],
}
</script>

<template>
  <div class="tiles-preview">
    <preview-tiles :config="config" />
  </div>
</template>
