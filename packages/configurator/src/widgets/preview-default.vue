<script>
import PreviewMixin from '~/widgets/preview.mixin'

export default {
  name: 'PreviewDefault',
  mixins: [PreviewMixin],
}
</script>

<template>
  <div class="preview-default">
    <preview-image :config="config" />
    <preview-content :config="config" />
    <preview-items :config="config" />
  </div>
</template>
