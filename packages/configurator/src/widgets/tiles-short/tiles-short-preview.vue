<script>
import PreviewMixin from '../preview.mixin'

export default {
  name: 'TilesShortPreview',
  mixins: [PreviewMixin],
}
</script>

<template>
  <div class="tiles-short-preview">
    <preview-tiles :config="config" />
  </div>
</template>
