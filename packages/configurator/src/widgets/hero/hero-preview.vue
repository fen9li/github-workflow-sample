<script>
import PreviewMixin from '../preview.mixin'

export default {
  name: 'HeroPreview',
  mixins: [PreviewMixin],
}
</script>

<template>
  <div class="hero-preview">
    <preview-image :config="config" />
    <preview-content :config="config" />
  </div>
</template>
