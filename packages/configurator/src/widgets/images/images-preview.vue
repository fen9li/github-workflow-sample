<script>
import PreviewMixin from '../preview.mixin'

export default {
  name: 'ImagesPreview',
  mixins: [PreviewMixin],
}
</script>

<template>
  <div class="images-preview">
    <preview-tiles :config="config" />
  </div>
</template>
