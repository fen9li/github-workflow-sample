<script>
import PreviewMixin from '../preview.mixin'

export default {
  name: 'TileImagePreview',
  mixins: [PreviewMixin],
}
</script>

<template>
  <div class="tile-image-preview">
    <preview-image :config="config" />
    <preview-content :config="config" />
  </div>
</template>
