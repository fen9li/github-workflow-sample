<script>
import PreviewMixin from '../preview.mixin'

export default {
  name: 'TextPreview',
  mixins: [PreviewMixin],
}
</script>

<template>
  <div class="text-preview">
    <preview-content :config="config" />
  </div>
</template>
